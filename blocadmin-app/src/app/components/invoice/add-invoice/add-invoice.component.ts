import { Component, OnInit } from '@angular/core';
import {Invoice} from "../../../model/Invoice";
import {InvoiceService} from "../../../services/invoice.service";
import {Observable} from "rxjs";
import {FileUploadService} from "../../../services/file-upload.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Supplier} from "../../../model/Supplier";
import {Meter} from "../../../model/Meter";
import {TypeOfMeterInvoice} from "../../../model/TypeOfMeterInvoice";
import {Building} from "../../../model/Building";
import {TokenStorageService} from "../../../services/token-storage.service";


@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {

  invoice: Invoice = {
    invoiceId: undefined,
    invoiceNumber: undefined,
    meterDataCurrent: undefined,
    meterDataPrevious: undefined,
    invoiceSum: undefined,
    unitPrice: undefined,
    payTill: undefined,
    emittedDate: undefined,
    dateOfPay: undefined,
    typeOfMeterInvoice: undefined,
    status: undefined,
    supplier: undefined,
    meter: undefined,
    buildings: undefined,
    invoiceFileId:undefined,
    hasMeter:true,
  };

  submitted = false;
  suppliers: Array<Supplier>= [];
  buildings: Array<Building>= [];
  meters: Array<Meter>= [];
  typeOfMeterInvoices: Array<TypeOfMeterInvoice> = [];
  hasMeter:boolean=true;

  //File upload
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  fileId:string='';

  previews: string[] = [];
  imageInfos?: Observable<any>;


  constructor(private invoiceService: InvoiceService,
              private uploadService: FileUploadService,
              public tokenStorageService:TokenStorageService,)
  {
    this.tokenStorageService.getPersonData();
  }

  ngOnInit(): void {
    this.getAllMeters();
    this.getAllSuppliers();
    this.getAllBuildings();
    this.getAllTypeOfMeterAndInvoice()

   }


  private getAllMeters(): void {
    this.invoiceService.getMeters()
      .subscribe(
        response => {
          this.meters=[];
          for (let item in response) {
            response[item].bindName = response[item].serial;
            this.meters.push(response[item]);

          }
          console.log("this.meters ",this.meters );
        },
        error => {
          console.log(error);
        });
    // return response;
  }
  private getAllSuppliers(): void {
    this.invoiceService.getSuppliers()
      .subscribe(
        response => {
          this.suppliers=[];
          for (let item in response) {
            response[item].bindName = response[item].supplierName;
            this.suppliers.push(response[item]);
            console.log("this.supplier ",this.suppliers );
          }
        },
        error => {
          console.log(error);
        });
    // return response;
  }
  private getAllBuildings(): void {
    this.invoiceService.getBuildings()
      .subscribe(
        response => {
          this.buildings=[];
          for (let item in response) {
            if(!response[item].address.entranceNo){
              response[item].bindName = response[item].address.city + " " + response[item].address.raion+ " " + response[item].address.street+ " " + response[item].address.houseNumber;
            }
            else {
              response[item].bindName = response[item].address.city + " " + response[item].address.raion+ " " + response[item].address.street+ " " + response[item].address.houseNumber+"/"+response[item].address.entranceNo;
            }
            this.buildings.push(response[item]);
            console.log("this.buildings ",this.buildings );
          }
        },
        error => {
          console.log(error);
        });
    // return response;
  }
  private getAllTypeOfMeterAndInvoice(): void {
    this.invoiceService.getTypeOfMeterAndInvoice()
      .subscribe(
        response => {
          this.typeOfMeterInvoices=[];
          this.typeOfMeterInvoices = response;
          console.log("TypeOfMeterInvoice",this.typeOfMeterInvoices);
        },
        error => {
          console.log(error);
        });
    // return response;
  }

  saveInvoice(): void {
    if (!this.invoice.buildings){
      // @ts-ignore
      this.invoice.buildings.push(this.invoice?.meter?.building);
    }
    const data = {
      invoiceNumber: this.invoice.invoiceNumber,
      meterDataCurrent: this.invoice.meterDataCurrent,
      meterDataPrevious: this.invoice.meterDataPrevious,
      invoiceSum: this.invoice.invoiceSum,
      unitPrice: this.invoice.unitPrice,
      payTill: this.invoice.payTill,
      emittedDate: this.invoice.emittedDate,
      dateOfPay: this.invoice.dateOfPay,
      typeOfMeterInvoice: this.invoice.typeOfMeterInvoice,
      supplier: this.invoice.supplier,
      buildings: this.invoice.buildings,
      meter: this.invoice.meter,
      invoiceFileId:this.fileId,
    };
    console.log("SaveInvoice",data);
    this.invoiceService.createInvoice(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newInvoice(): void {
    this.submitted = false;

    this.invoice = {
      invoiceId: undefined,
      invoiceNumber: undefined,
      meterDataCurrent: undefined,
      meterDataPrevious: undefined,
      invoiceSum: undefined,
      unitPrice: undefined,
      payTill: undefined,
      emittedDate: undefined,
      dateOfPay: undefined,
      typeOfMeterInvoice: undefined,
      supplier: undefined,
      meter: undefined,
      status:undefined,
      hasMeter:true,
    };
  }

  //File upload and view methods
  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }
  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }
  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.uploadService.upload(file).subscribe(
        (event: any) => {

          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            if(event.body.fileDB!="Unknown"){

                this.fileId=event.body.fileDB[0].name;
              console.log("File-Id",this.fileId);
              // this.imageInfos = this.uploadService.getFilesById(this.fileId);
              this.imageInfos = event.body.fileDB[0];
              console.log("imageInfos",this.imageInfos);
            }
            // const msg = 'Uploaded the file successfully: ' + file.name;
            const msg = event.body.message;
            this.message.push(msg);

            // this.imageInfos = this.uploadService.getFiles();


          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        });
    }

}

  changeMeter() {
    this.invoice.buildings=[];
    this.invoice.meter=undefined;
    this.invoice.meterDataCurrent=undefined;

  }
}
