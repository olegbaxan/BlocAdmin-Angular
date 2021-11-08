import { Component, OnInit } from '@angular/core';
import {Person} from "../../../model/Person";
import {Supplier} from "../../../model/Supplier";
import {Address} from "../../../model/Address";
import {any} from "codelyzer/util/function";
import {SupplierService} from "../../../services/supplier.service";
import {AddressService} from "../../../services/address.service";

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {
  supplier: Supplier = {
    supplierid: undefined,
    supplierName: '',
    fiscalCode: '',
    bankCode: '',
    details: '' ,
    IBAN: '',
    address:undefined,
  };

  submitted = false;
  addresses:any = [];
  selectedAddress:any=[];

  constructor(private supplierService: SupplierService,
              private addressService: AddressService) { }

  ngOnInit(): void {
    this.getAllAddresses();
  }

  private getAllAddresses():void {
    this.supplierService.getAddresses()
      .subscribe(
        response => {
          this.addresses = response;
          console.log("address",this.addresses);
          console.log("responce",response);
        },
        error => {
          console.log(error);
        });
    // return response;
  }
  saveSupplier(): void {
    console.log("this.selectedAddress",this.selectedAddress);
    const data = {
      supplierName: this.supplier.supplierName,
      fiscalCode: this.supplier.fiscalCode,
      bankCode: this.supplier.bankCode,
      IBAN: this.supplier.IBAN,
      details: this.supplier.details,
      address: this.selectedAddress,
    };

    this.supplierService.createSupplier(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
  newSupplier(): void {
    this.submitted = false;

    this.supplier = {
      supplierid: undefined,
      supplierName: '',
      bankCode: '',
      fiscalCode: '',
      IBAN: '',
      details: '',
      address:undefined,
    };
  }

}
