import {Component, Injectable, OnInit} from '@angular/core';
import {EditAddressComponent} from "../edit-address/edit-address.component";
import {AddressService} from "../../../services/address.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Address} from "../../../model/Address";


@Component({
  selector: 'app-list-address',
  templateUrl: './list-address.component.html',
  styleUrls: ['./list-address.component.css'],
})
@Injectable({providedIn:EditAddressComponent})
export class ListAddressComponent implements OnInit {

  // addresses: any;
  // title="Delete address";
  address:any;
  message = '';
  query = '';

  addresses: Address[] = [];
  currentAddress?: Address;
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(
    private addressService: AddressService,
    private route: ActivatedRoute,
    private router: Router,) {};

  ngOnInit(): void {
    this.retrieveAddresses();
    // this.getAddressById(this.route.snapshot.paramMap.get('id'));
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page-1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveAddresses(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.addressService.getAll(params)
      .subscribe(
        response => {
          const { addresses, totalItems } = response;
          this.addresses = addresses;
          this.count = totalItems;
          console.log(addresses);
          console.log(totalItems);
          // console.log(JSON.stringify(response));
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveAddresses();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveAddresses();
  }

  deleteAddress(id: number) {
    this.addressService.deleteAddress(id)
      .subscribe(() => {
          this.message = 'The person was deleted successfully!';
          this.addresses.splice(id, 1);
          this.ngOnInit()
        }
        , (error) => {
          console.error(error);
        });
  }
}
