import { Component, OnInit } from '@angular/core';
import {Building} from "../../../model/Building";
import {BuildingService} from "../../../services/building.service";
import {AddressService} from "../../../services/address.service";
import {Flat} from "../../../model/Flat";
import {FlatService} from "../../../services/flat.service";
import {PersonService} from "../../../services/person.service";
import {MeterService} from "../../../services/meter.service";

@Component({
  selector: 'app-add-flat',
  templateUrl: './add-flat.component.html',
  styleUrls: ['./add-flat.component.css']
})
export class AddFlatComponent implements OnInit {

  flat: Flat = {
    flatid: undefined,
    flatNumber: undefined,
    floor: undefined,
    ladder: undefined,
    wallet:undefined,
    person:undefined,
    building:undefined,
    meters:undefined,
    numberOfPerson:undefined,
  };

  submitted = false;
  persons: any = [];
  buildings: any = [];
  meters: any = [];
  selectedPerson: any ;
  selectedMeters: any = [];
  selectedBuilding: any;

  constructor(private flatService: FlatService,
              private personService: PersonService,
              private buildingService: BuildingService,
              private meterService: MeterService) {
  }

  ngOnInit(): void {
    this.getAllPersons();
    this.getAllMeters();
    this.getAllBuildings();
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
  private getAllMeters(): void {
    this.flatService.getMeters()
      .subscribe(
        response => {
          for (let item in response) {
            response[item].bindName = response[item].serial + " " + response[item].type;
            this.meters.push(response[item]);
          }
        },
        error => {
          console.log(error);
        });
    // return response;
  }
  private getAllBuildings(): void {
    this.flatService.getBuildings()
      .subscribe(
        response => {
          for (let item in response) {
            response[item].bindName = response[item].address.city + " " + response[item].address.raion+ " " + response[item].address.street+ " " + response[item].address.houseNumber;

            this.buildings.push(response[item]);
            console.log("this.buildings ",this.buildings );
          }
        },
        error => {
          console.log(error);
        });
    // return response;
  }

  saveFlat(): void {
    const data = {
      flatNumber: this.flat.flatNumber,
      floor: this.flat.floor,
      ladder: this.flat.ladder,
      wallet: this.flat.wallet,
      numberOfPerson: this.flat.numberOfPerson,
      person: this.selectedPerson,
      building: this.selectedBuilding,
      meter: this.selectedMeters,
    };

    this.flatService.createFlat(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newFlat(): void {
    this.submitted = false;

    this.flat = {
      flatid: undefined,
      flatNumber: undefined,
      floor: undefined,
      ladder: undefined,
      wallet:undefined,
      person:undefined,
      building:undefined,
      meters:undefined,
      numberOfPerson:undefined,
    };
  }

}
