import { Component, OnInit } from '@angular/core';
import {BuildingService} from "../../../services/building.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FlatService} from "../../../services/flat.service";
import {PersonService} from "../../../services/person.service";
import {MeterService} from "../../../services/meter.service";
import {Person} from "../../../model/Person";

@Component({
  selector: 'app-edit-flat',
  templateUrl: './edit-flat.component.html',
  styleUrls: ['./edit-flat.component.css']
})
export class EditFlatComponent implements OnInit {

  title="Edit building form";
  flat:any;
  message = '';
  persons: any = [];
  buildings: any = [];
  meters: any = [];
  selectedPerson: any = [];
  selectedMeters: Person[] = [];
  selectedBuilding: any;
  constructor(private flatService: FlatService,
              private personService: PersonService,
              private buildingService: BuildingService,
              private meterService: MeterService,
              private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit(): void {
    this.message = '';

    this.getFlatById(this.route.snapshot.paramMap.get('id'));
    this.getAllPersons();
    this.getAllBuildings();
    this.getAllMeters();
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
  private getFlatById(id: string | number | null):void {
    this.flatService.getById(id)
      .subscribe(
        data => {
          this.flat = data;
          this.selectedBuilding=data.building.buildingid+" "+data.building.address.city+" "+data.building.address.raion;
          this.selectedPerson=data.person.name+" "+data.person.surname;
          this.selectedMeters=data.meter;
          console.log("this.flat",this.flat);
          console.log("this.selectedPerson",this.selectedPerson);
          console.log("this.selectedPerson",this.selectedPerson);
          console.log("this.selectedMeters",this.selectedMeters);
        },
        error => {
          console.log(error);
        });
  }
  updateFlat(playlistForm: { reset: () => void; }): void {
    this.flat.building=this.selectedBuilding;
    this.flat.person=this.selectedPerson;
    this.flat.meter=this.selectedMeters;
    this.flatService.editFlat(this.flat.flatid, this.flat)
      .subscribe(
        response => {
          this.message = 'The flat was updated successfully!';
        },
        error => {
          console.log(error);
        });
    setTimeout(()=>{
      playlistForm.reset();
      this.router.navigate(['/flats']);
    }, 1000);
  }
  updatePublished(status: any): void {
    const data = {
      title: this.flat.title,
      description: this.flat.flatid,
      published: status
    };

    this.flatService.editFlat(this.flat.id, data)
      .subscribe(
        response => {
          this.flat.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

}
