import {Component, OnInit} from '@angular/core';
import {Building} from "../../../model/Building";
import {AddressService} from "../../../services/address.service";
import {BuildingService} from "../../../services/building.service";
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-add-building',
  templateUrl: './add-building.component.html',
  styleUrls: ['./add-building.component.css']
})
export class AddBuildingComponent implements OnInit {
  building: Building = {
    buildingid: undefined,
    flats: undefined,
    floors: undefined,
    address: undefined,
  };

  submitted = false;
  addresses: any = [];
  selectedAddress: any ;

  constructor(private buildingService: BuildingService,
              private addressService: AddressService,
              public tokenStorageService:TokenStorageService,)
{
  this.tokenStorageService.getPersonData();
}

  ngOnInit(): void {
    this.getAllAddresses();
  }

  private getAllAddresses(): void {
    this.buildingService.getAddresses()
      .subscribe(
        response => {
          this.addresses=[];
            this.addresses=response;
          // }
        },
        error => {
          console.log(error);
        });
    // return response;
  }

  saveBuilding(): void {
    console.log("this.selectedAddress", this.selectedAddress);
    const data = {
      buildingid: this.building.buildingid,
      floors: this.building.floors,
      flats: this.building.flats,
      address: this.selectedAddress,
    };

    this.buildingService.createBuilding(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newBuilding(): void {
    this.submitted = false;
this.selectedAddress=undefined;
    this.building = {
      buildingid: undefined,
      flats: undefined,
      floors: undefined,
      address: undefined,

    };
  }
}
