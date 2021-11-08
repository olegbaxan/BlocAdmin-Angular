import { Component, OnInit } from '@angular/core';
import {SupplierService} from "../../../services/supplier.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BuildingService} from "../../../services/building.service";

@Component({
  selector: 'app-edit-building',
  templateUrl: './edit-building.component.html',
  styleUrls: ['./edit-building.component.css']
})
export class EditBuildingComponent implements OnInit {

  title="Edit building form";
  building:any;
  message = '';
  addresses:any = [];
  selectedAddress:any=[];
  constructor(private buildingService: BuildingService,
              private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit(): void {
    this.message = '';

    this.getBuildingById(this.route.snapshot.paramMap.get('id'));
    this.getAllAddresses();
  }
  private getAllAddresses():void {
    this.buildingService.getAddresses()
      .subscribe(
        response => {
          for (let item in response) {
            response[item].bindName = response[item].city + " " + response[item].raion+ " " + response[item].street+ " " + response[item].houseNumber;
            this.addresses.push(response[item]);
          }
        },
        error => {
          console.log(error);
        });
  }
  private getBuildingById(id: string | number | null):void {
    this.buildingService.getById(id)
      .subscribe(
        data => {
          this.building = data;
          this.selectedAddress=data.address.city+" "+data.address.raion+" "+data.address.street+" "+data.address.houseNumber;
        },
        error => {
          console.log(error);
        });
  }
  updateBuilding(playlistForm: { reset: () => void; }): void {
    this.building.address=this.selectedAddress;
    this.buildingService.editBuilding(this.building.buildingid, this.building)
      .subscribe(
        response => {
          this.message = 'The building was updated successfully!';
        },
        error => {
          console.log(error);
        });
    setTimeout(()=>{
      playlistForm.reset();
      this.router.navigate(['/buildings']);
    }, 1000);
  }
  updatePublished(status: any): void {
    const data = {
      title: this.building.title,
      description: this.building.buildingid,
      published: status
    };

    this.buildingService.editBuilding(this.building.id, data)
      .subscribe(
        response => {
          this.building.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }
}
