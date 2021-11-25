import {Component, OnInit} from '@angular/core';
import {MeterService} from "../../../services/meter.service";
import {FlatService} from "../../../services/flat.service";
import {PersonService} from "../../../services/person.service";
import {SupplierService} from "../../../services/supplier.service";
import {ActivatedRoute, Router} from "@angular/router";
import {InvoiceService} from "../../../services/invoice.service";
import {Supplier} from "../../../model/Supplier";
import {Meter} from "../../../model/Meter";
import {TypeOfMeterInvoice} from "../../../model/TypeOfMeterInvoice";
import {Building} from "../../../model/Building";
import {TokenStorageService} from "../../../services/token-storage.service";


@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css']
})
export class EditInvoiceComponent implements OnInit {

  title = "Edit meter form";
  invoice: any;
  message = '';
  meters: Meter[] = [];
  suppliers: Supplier[] = [];
  buildings: Building[] = [];
  selectedMeter: Meter | undefined;
  selectedSupplier: Supplier | undefined;//undefined
  typeOfMeterInvoice: TypeOfMeterInvoice[] = [];
  selectedTypeOfMeterInvoice: TypeOfMeterInvoice | undefined;
  selectedBuildings: Building | undefined;
  hasMeter: boolean = true;

  constructor(private meterService: MeterService,
              private invoiceService: InvoiceService,
              private supplierService: SupplierService,
              private route: ActivatedRoute,
              private router: Router,
              public tokenStorageService:TokenStorageService,)
  {
    this.tokenStorageService.getPersonData();
  }

  ngOnInit(): void {
    this.message = '';

    this.getInvoiceById(this.route.snapshot.paramMap.get('id'));
    this.getAllMeters();
    this.getAllBuildings();
    this.getAllSuppliers();
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
          console.log("Meters ", this.meters)
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

          }
          console.log("this.suppliers ", this.suppliers);
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
            if (!response[item].address.entranceNo) {
              response[item].bindName = response[item].address.city + " " + response[item].address.raion + " " + response[item].address.street + " " + response[item].address.houseNumber;
            } else {
              response[item].bindName = response[item].address.city + " " + response[item].address.raion + " " + response[item].address.street + " " + response[item].address.houseNumber + "/" + response[item].address.entranceNo;
            }
            this.buildings.push(response[item]);
          }
          console.log("this.buildings ", this.buildings);
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
          this.typeOfMeterInvoice=[];
          this.typeOfMeterInvoice = response;
          console.log("typeOfMeterInvoice", this.typeOfMeterInvoice);
        },
        error => {
          console.log(error);
        });
    // return response;
  }

  private getInvoiceById(id: string | number | null): void {
    this.invoiceService.getById(id)
      .subscribe(
        data => {
          console.log("Data", data);

          this.invoice = data;
          if (data.buildings) {

            for (let i in data.buildings) {
              if (!data.buildings[i].address.entranceNo) {
                data.buildings[i].bindName = data.buildings[i].address.city + " " + data.buildings[i].address.raion + " " + data.buildings[i].address.street + " " + data.buildings[i].address.houseNumber;
              }else{
                data.buildings[i].bindName = data.buildings[i].address.city + " " + data.buildings[i].address.raion+ " " + data.buildings[i].address.street+ " " + data.buildings[i].address.houseNumber+"/"+data.buildings[i].address.entranceNo;
              }
            }
          }
          data.supplier.bindName=data.supplier.supplierName;
          if(data.typeOfMeterInvoice){
            data.typeOfMeterInvoice.bindName=data.typeOfMeterInvoice.name
          }
          if(data.meter){
            console.log("data.meter", data.meter);
            data.meter.bindName=data.meter.serial;
          }

          this.selectedSupplier = data.supplier;
          this.selectedMeter = data.meter;
          this.selectedBuildings = data.buildings;
          this.selectedTypeOfMeterInvoice = data.typeOfMeterInvoice;
          if (data.meter) {
            this.hasMeter = true
          } else {
            this.hasMeter = false;
          }
        },
        error => {
          console.log(error);
        });
  }

  updateInvoice(playlistForm: { reset: () => void; }): void {
    this.invoice.supplier = this.selectedSupplier;
    this.invoice.meter = this.selectedMeter;
    this.invoice.typeOfMeterInvoice = this.selectedTypeOfMeterInvoice;
    this.invoice.buildings=this.selectedBuildings;
    this.invoiceService.editInvoice(this.invoice.invoiceId, this.invoice)
      .subscribe(
        response => {
          this.message = 'The meter was updated successfully!';
        },
        error => {
          console.log(error);
        });
    setTimeout(() => {
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

  setTypeOfMeterInvoice($event: Event) {
    console.log("Event",$event);
    // console.log("selectedType",selectedTypeOfMeterInvoice);
  }
}
