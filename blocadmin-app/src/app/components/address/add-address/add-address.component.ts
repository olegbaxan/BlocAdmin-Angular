import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AddressService} from "../../../services/address.service";

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {

  title="Add address form";
  city='';
  raion='';
  street='';
  houseNumber='';
  formdata:FormGroup;

  constructor(private addressService: AddressService) {
    this.formdata=new FormGroup({})
  }

  ngOnInit(): void {
    this.formdata = new FormGroup({
      city: new FormControl("",Validators.required),
      raion: new FormControl("",Validators.required),
      street: new FormControl("",Validators.required),
      houseNumber: new FormControl("",[Validators.required,Validators.maxLength(10)]),
    });
  }
  createAddress(data:any){
      this.addressService.createAddress(data)
        .subscribe(() => {
            this.city = data.city;
            this.raion = data.raion;
            this.street = data.street;
            this.houseNumber = data.houseNumber;
          }
          , (error) => {
            console.error(error);
          }
        );
      setTimeout(() => {
        this.formdata.reset();
      }, 1000);
    }
  }
