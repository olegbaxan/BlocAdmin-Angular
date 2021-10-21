import {Component, Injectable, OnInit} from '@angular/core';
import {EditAddressComponent} from "../edit-address/edit-address.component";
import {AddressService} from "../../../services/address.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-list-address',
  templateUrl: './list-address.component.html',
  styleUrls: ['./list-address.component.css']
})
@Injectable({providedIn:EditAddressComponent})
export class ListAddressComponent implements OnInit {

  addresses: any;
  address:any;
  selectedAddress = null;
  currentIndex = -1;
  query = '';
  addNew :any;
  edit :any;
  message = '';

  constructor(
    private addressService: AddressService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this.retrieveAddresses();
    // this.getAddressById(this.route.snapshot.paramMap.get('id'));
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

  // toggleAddNew() {
  //   this.addNew = true;
  // }
  // toggleCancel() {
  //   this.addNew = false;
  //   this.edit = false;
  // }
  // toggleEdit(id: number) {
  //   this.edit = true;
  //   this.getAddressById(id);
  //   console.log(this.address);
  //   this.updateAddress(this.address);
  // }
  // private getAddressById(id: string | number | null):void {
  //   this.addressService.getById(id)
  //     .subscribe(
  //       data => {
  //         this.address = data;
  //         // console.log("AddressID: "+this.address.addressid)
  //         // console.log(this.address);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }
  // updateAddress(playlistForm: { reset: () => void; }): void {
  //   this.addressService.editAddress(this.address.addressId, this.address)
  //     .subscribe(
  //       response => {
  //         console.log(response);
  //         this.message = 'The person was updated successfully!';
  //         // this.router.navigate(['/', 'address']);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  //   setTimeout(()=>{
  //     playlistForm.reset();
  //     this.router.navigate(['/address']);
  //   }, 1000);
  // }
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
