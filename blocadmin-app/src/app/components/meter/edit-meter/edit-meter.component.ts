import { Component, OnInit } from '@angular/core';
import {FlatService} from "../../../services/flat.service";
import {PersonService} from "../../../services/person.service";
import {BuildingService} from "../../../services/building.service";
import {MeterService} from "../../../services/meter.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SupplierService} from "../../../services/supplier.service";

@Component({
  selector: 'app-edit-meter',
  templateUrl: './edit-meter.component.html',
  styleUrls: ['./edit-meter.component.css']
})
export class EditMeterComponent implements OnInit {

  title="Edit meter form";
  meter:any;
  message = '';
  persons: any = [];
  flats: any = [];
  suppliers: any =[];
  selectedPerson: any;
  selectedSuppliers: any;
  selectedFlats: any;
  meterType:any = [];
  selectedMeterType:any;
  typeOfMeterAndInvoice:any = [];
  selectedTypeOfMeterAndInvoice:any;
  constructor(private meterService: MeterService,
              private flatService: FlatService,
              private personService: PersonService,
              private supplierService: SupplierService,
              private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit(): void {
    this.message = '';

    this.getMeterById(this.route.snapshot.paramMap.get('id'));
    this.getAllPersons();
    this.getAllFlats();
    this.getAllSuppliers();
    this.getAllMeterType();
    this.getAllTypeOfMeterAndInvoice()
  }
  private getAllPersons(): void {
    this.flatService.getPersons()
      .subscribe(
        response => {
          for (let item in response) {
            response[item].bindName = response[item].name + " " + response[item].surname;
            this.persons.push(response[item]);
            console.log("Persons ",this.persons)
          }
        },
        error => {
          console.log(error);
        });
    // return response;
  }
  private getAllFlats(): void {
    this.meterService.getFlats()
      .subscribe(
        response => {
          for (let item in response) {
            response[item].bindName = response[item].flatNumber;
            this.flats.push(response[item]);
          }
        },
        error => {
          console.log(error);
        });
    // return response;
  }
  private getAllSuppliers(): void {
    this.meterService.getSuppliers()
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
  private getAllMeterType(): void {
    this.meterService.getMeterType()
      .subscribe(
        response => {
          this.meterType = response;
        },
        error => {
          console.log(error);
        });
    // return response;
  }
  private getAllTypeOfMeterAndInvoice(): void {
    this.meterService.getTypeOfMeterAndInvoice()
      .subscribe(
        response => {
          this.typeOfMeterAndInvoice = response;
        },
        error => {
          console.log(error);
        });
    // return response;
  }
  private getMeterById(id: string | number | null):void {
    this.meterService.getById(id)
      .subscribe(
        data => {
          console.log("Data",data);
          console.log("data.person.name",data.person.name);
          console.log("data.supplier.name",data.supplier.supplierName);
          this.meter = data;
          this.selectedSuppliers=data.supplier.supplierName;
          this.selectedPerson=data.person.name+" "+data.person.surname;
          this.selectedFlats=data.flat.flatNumber;
          this.selectedMeterType=data.meterType;
          this.selectedTypeOfMeterAndInvoice=data.typeOfMeterAndInvoice;
        },
        error => {
          console.log(error);
        });
  }
  updateMeter(playlistForm: { reset: () => void; }): void {
    this.meter.supplier=this.selectedSuppliers;
    this.meter.person=this.selectedPerson;
    this.meter.flat=this.selectedFlats;
    this.meter.meterType=this.selectedMeterType;
    this.meter.typeOfMeterAndInvoice=this.selectedTypeOfMeterAndInvoice;
    this.meterService.editMeter(this.meter.meterid, this.meter)
      .subscribe(
        response => {
          this.message = 'The meter was updated successfully!';
        },
        error => {
          console.log(error);
        });
    setTimeout(()=>{
      playlistForm.reset();
      this.router.navigate(['/meters']);
    }, 1000);
  }
  updatePublished(status: any): void {
    const data = {
      title: this.meter.title,
      description: this.meter.meterid,
      published: status
    };

    this.meterService.editMeter(this.meter.id, data)
      .subscribe(
        response => {
          this.meter.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

}
