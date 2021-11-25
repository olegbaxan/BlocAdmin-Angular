import {Component, OnInit} from '@angular/core';
import {Building} from "../../../model/Building";
import {BuildingService} from "../../../services/building.service";
import {AddressService} from "../../../services/address.service";
import {Flat} from "../../../model/Flat";
import {FlatService} from "../../../services/flat.service";
import {PersonService} from "../../../services/person.service";
import {MeterService} from "../../../services/meter.service";
import {Meter} from "../../../model/Meter";
import {Person} from "../../../model/Person";
import {TokenStorageService} from "../../../services/token-storage.service";

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
    entrance: undefined,
    wallet: undefined,
    person: undefined,
    building: undefined,
    meters: undefined,
    numberOfPerson: undefined,
  };

  submitted = false;
  persons: Person[] = [];
  buildings: Building[] = [];
  meters: Meter[] = [];
  selectedPerson: Person | undefined;
  selectedMeters: Meter[] = [];
  selectedBuilding: Building | undefined;
  flatError: boolean = false;
  floorError: boolean = false;

  constructor(private flatService: FlatService,
              private personService: PersonService,
              private buildingService: BuildingService,
              private meterService: MeterService,
              public tokenStorageService: TokenStorageService,) {
    this.tokenStorageService.getPersonData();
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
          this.persons = [];
          for (let item in response) {
            // console.log("response roles ",response[item].roles)

            for (var i in response[item].roles) {
              if (response[item].roles[i].name === "ROLE_USER") {
                response[item].bindName = response[item].name + " " + response[item].surname;
                this.persons.push(response[item]);
              }
            }
          }
          console.log("Persons ", this.persons)
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
          this.meters = [];
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
          this.buildings = [];
          for (let item in response) {
            if (!response[item].entranceNo) {
              response[item].bindName = response[item].city + " " + response[item].raion + " " + response[item].street + " " + response[item].houseNumber
            } else {
              response[item].bindName = response[item].city + " " + response[item].raion + " " + response[item].street + " " + response[item].houseNumber + "/" + response[item].entranceNo;
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

  saveFlat(): void {
    const data = {
      flatNumber: this.flat.flatNumber,
      floor: this.flat.floor,
      entrance: this.selectedBuilding?.address?.entranceNo,
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
    this.selectedBuilding = undefined;
    this.selectedPerson = undefined;
    this.flat = {
      flatid: undefined,
      flatNumber: undefined,
      floor: undefined,
      entrance: undefined,
      wallet: undefined,
      person: undefined,
      building: undefined,
      meters: undefined,
      numberOfPerson: undefined,
    };
  }

  select() {
    console.log("Selected Building", this.selectedBuilding)
  }

  chooseFlatNumber($event: any) {
    // @ts-ignore
    if (this.selectedBuilding && ($event.target.value > this.selectedBuilding?.flats)) {
      this.flatError = true;
    } else this.flatError = false;

  }

  chooseFloorNumber($event: any) {
    // @ts-ignore
    if (this.selectedBuilding && ($event.target.value > this.selectedBuilding?.floors)) {
      this.floorError = true;
    } else this.floorError = false;

  }
}
