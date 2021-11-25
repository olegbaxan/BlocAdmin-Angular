import { Component, OnInit } from '@angular/core';
import {SupplierService} from "../../../services/supplier.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BuildingService} from "../../../services/building.service";
import {Address} from "../../../model/Address";
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {TokenStorageService} from "../../../services/token-storage.service";

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
  selectedAddress:Address=new Address();
  constructor(private buildingService: BuildingService,
              private route: ActivatedRoute,
              private router: Router,
              public tokenStorageService:TokenStorageService,)
  {
    this.tokenStorageService.getPersonData();
  }
  ngOnInit(): void {
    this.message = '';

    this.getBuildingById(this.route.snapshot.paramMap.get('id'));
    this.getAllAddresses();
  }
  private getAllAddresses():void {
    this.buildingService.getAddresses()
      .subscribe(
        response => {
          this.addresses=[];
          for (let item in response) {
            if(!response[item].entranceNo){
              response[item].bindName = response[item].city + " " + response[item].raion+ " " + response[item].street+ " " + response[item].houseNumber
            }
            else {
              response[item].bindName = response[item].city + " " + response[item].raion+ " " + response[item].street+ " " + response[item].houseNumber+"/"+response[item].entranceNo;
            }
                   this.addresses.push(response[item]);
          }
          console.log("Address",this.addresses);
        },
        error => {
          console.log(error);
        });
  }
  private getBuildingById(id: string | number | null):void {
    this.buildingService.getById(id)
      .subscribe(
        data => {
          if(!data.address.entranceNo){
            data.address.bindName = data.address.city + " " + data.address.raion+ " " + data.address.street+ " " + data.address.houseNumber;
          }
          else {
            data.address.bindName = data.address.city + " " + data.address.raion+ " " + data.address.street+ " " + data.address.houseNumber+"/"+data.address.entranceNo;
          }
          this.building = data;
          this.selectedAddress=data.address;

          console.log("Data",data)
          console.log("this.selectedAddress",this.selectedAddress)
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
