import {Component, OnInit} from '@angular/core';
import {AddressService} from "../../../services/address.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {

  title="Edit address form";
  address:any;
  message = '';
  constructor(
    private addressService: AddressService,
    private route: ActivatedRoute,
    private router: Router,

  ) {}


  ngOnInit(): void {
    this.message = '';
    this.getAddressById(this.route.snapshot.paramMap.get('id'));
  }

  private getAddressById(id: string | number | null):void {
    this.addressService.getById(id)
      .subscribe(
        data => {
          this.address = data;
          // console.log("AddressID: "+this.address.addressid)
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  updateAddress(playlistForm: { reset: () => void; }): void {
    this.addressService.editAddress(this.address.addressId, this.address!)
      .subscribe(
        response => {
          // console.log(response);
          this.message = 'The person was updated successfully!';
          // this.router.navigate(['/', 'address']);
        },
        error => {
          console.log(error);
        });
    setTimeout(()=>{
      playlistForm.reset();
      this.router.navigate(['/address']);
    }, 1000);
  }
  updatePublished(status: any): void {
    const data = {
      title: this.address.title!,
      description: this.address.city,
      published: status
    };

    this.addressService.editAddress(this.address.id, data)
      .subscribe(
        response => {
          this.address.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }
}
