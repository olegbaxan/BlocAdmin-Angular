import { Component, OnInit } from '@angular/core';
import {MeterService} from "../../../services/meter.service";
import {FlatService} from "../../../services/flat.service";
import {PersonService} from "../../../services/person.service";
import {SupplierService} from "../../../services/supplier.service";
import {ActivatedRoute, Router} from "@angular/router";
import {InvoiceService} from "../../../services/invoice.service";

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css']
})
export class EditInvoiceComponent implements OnInit {

  title="Edit meter form";
  invoice:any;
  message = '';
  meters: any = [];
  suppliers: any =[];
  selectedMeter: any;
  selectedSupplier: any;
  typeOfMeterAndInvoice:any = [];
  selectedTypeOfMeterAndInvoice:any;
  constructor(private meterService: MeterService,
              private invoiceService: InvoiceService,
              private supplierService: SupplierService,
              private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit(): void {
    this.message = '';

    this.getInvoiceById(this.route.snapshot.paramMap.get('id'));
    this.getAllMeters();
    this.getAllSuppliers();
    this.getAllTypeOfMeterAndInvoice()
  }
  private getAllMeters(): void {
    this.invoiceService.getMeters()
      .subscribe(
        response => {
          for (let item in response) {
            response[item].bindName = response[item].serial + " " + response[item].flat;
            this.meters.push(response[item]);
            console.log("Meters ",this.meters)
          }
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
          for (let item in response) {
            response[item].bindName = response[item].supplierName;
            this.suppliers.push(response[item]);
            console.log("this.suppliers ",this.suppliers );
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
          this.typeOfMeterAndInvoice = response;
        },
        error => {
          console.log(error);
        });
    // return response;
  }
  private getInvoiceById(id: string | number | null):void {
    this.invoiceService.getById(id)
      .subscribe(
        data => {
          console.log("Data",data);
          console.log("data.person.name",data.person.name);
          console.log("data.supplier.name",data.supplier.supplierName);
          this.invoice = data;
          this.selectedSupplier=data.supplier.supplierName;
          this.selectedMeter=data.meter.serial+" "+data.meter.flat;
          this.selectedTypeOfMeterAndInvoice=data.typeOfMeterAndInvoice;
        },
        error => {
          console.log(error);
        });
  }
  updateInvoice(playlistForm: { reset: () => void; }): void {
    this.invoice.supplier=this.selectedSupplier;
    this.invoice.meter=this.selectedMeter;
    this.invoice.typeOfMeterAndInvoice=this.selectedTypeOfMeterAndInvoice;
    this.invoiceService.editInvoice(this.invoice.invoiceId, this.invoice)
      .subscribe(
        response => {
          this.message = 'The meter was updated successfully!';
        },
        error => {
          console.log(error);
        });
    setTimeout(()=>{
      playlistForm.reset();
      this.router.navigate(['/invoices']);
    }, 1000);
  }
  updatePublished(status: any): void {
    const data = {
      title: this.invoice.title,
      description: this.invoice.invoiceId,
      published: status
    };

    this.invoiceService.editInvoice(this.invoice.id, data)
      .subscribe(
        response => {
          this.invoice.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }
}
