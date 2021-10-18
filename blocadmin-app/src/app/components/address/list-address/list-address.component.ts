import {Component, Injectable, OnInit} from '@angular/core';
import {EditAddressComponent} from "../edit-address/edit-address.component";
import {AddressService} from "../../../services/address.service";

@Component({
  selector: 'app-list-address',
  templateUrl: './list-address.component.html',
  styleUrls: ['./list-address.component.css']
})
@Injectable({providedIn:EditAddressComponent})
export class ListAddressComponent implements OnInit {

  addresses: any;
  selectedAddress = null;
  currentIndex = -1;
  query = '';

  constructor(private addressService: AddressService) {
  }

  ngOnInit(): void {
    this.retrieveAddresses();
  }

  private retrieveAddresses(): void {
    this.addressService.getAll()
      .subscribe((data) => {
          this.addresses = data;
          console.log(data);
        },
        (error) => {
          console.error(error);
        });
  }

  deleteAddress(id: number) {
    this.addressService.deleteAddress(id)
      .subscribe(() => {
          this.addresses.splice(id, 1);
        }
        , (error) => {
          console.error(error);
        });
  }
}
