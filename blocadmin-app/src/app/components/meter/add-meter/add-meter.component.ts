import {Component, OnInit} from '@angular/core';

import {FlatService} from "../../../services/flat.service";
import {PersonService} from "../../../services/person.service";
import {BuildingService} from "../../../services/building.service";
import {MeterService} from "../../../services/meter.service";
import {Meter} from "../../../model/Meter";
import {SupplierService} from "../../../services/supplier.service";

@Component({
  selector: 'app-add-meter',
  templateUrl: './add-meter.component.html',
  styleUrls: ['./add-meter.component.css']
})
export class AddMeterComponent implements OnInit {

  meter: Meter = {
    meterid: undefined,
    meterType: undefined,
    serial: undefined,
    initialValue: undefined,
    typeOfMeterAndInvoice: undefined,
    person: undefined,
    supplier: undefined,
    flat: undefined,
  };

  submitted = false;
  persons: any = [];
  flats: any = [];
  suppliers: any = [];
  selectedPerson: any = [];
  selectedSuppliers: any = [];
  selectedFlats: any;
  meterType: any = [];
  selectedMeterType: any;
  typeOfMeterAndInvoice: any = [];
  selectedTypeOfMeterAndInvoice: any;

  constructor(private meterService: MeterService,
              private flatService: FlatService,
              private personService: PersonService,
              private supplierService: SupplierService,) {
  }

  ngOnInit(): void {
    this.getAllPersons();
    this.getAllFlats();
    this.getAllSuppliers();
    this.getAllMeterType();
    this.getAllTypeOfMeterAndInvoice()
  }

  private getAllPersons(): void {
    this.meterService.getPersons()
      .subscribe(
        response => {
          for (let item in response) {
            response[item].bindName = response[item].name + " " + response[item].surname;
            this.persons.push(response[item]);
            console.log("Persons ", this.persons)
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
            // response[item].bindName = response[item].flatNumber+" "+response[item].floor;
            response[item].bindName = response[item].flatNumber;
            this.flats.push(response[item]);
            console.log("FLats ", this.flats);
            console.log("FLatsNumber ", this.flats.flatNumber);
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
            console.log("this.suppliers ", this.suppliers);
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

  saveFlat(): void {
    const data = {
      serial: this.meter.serial,
      meterType: this.meter.meterType,
      initialValue: this.meter.initialValue,
      typeOfMeterAndInvoice: this.meter.typeOfMeterAndInvoice,
      person: this.selectedPerson,
      supplier: this.selectedSuppliers,
      flat: this.selectedFlats,
    };
    console.log("MeterData ", data);
    this.meterService.createMeter(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newMeter(): void {
    this.submitted = false;

    this.meter = {
      meterid: undefined,
      meterType: undefined,
      serial: undefined,
      initialValue: undefined,
      typeOfMeterAndInvoice: undefined,
      person: undefined,
      supplier: undefined,
      flat: undefined,
    };
  }
}
