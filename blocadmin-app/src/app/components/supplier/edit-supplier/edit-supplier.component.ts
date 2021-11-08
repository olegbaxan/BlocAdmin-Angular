import { Component, OnInit } from '@angular/core';
import {PersonService} from "../../../services/person.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SupplierService} from "../../../services/supplier.service";

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css']
})
export class EditSupplierComponent implements OnInit {
  title="Edit supplier form";
  supplier:any;
  message = '';
  addresses:any = [];
  selectedAddress:any=[];
  constructor(private supplierService: SupplierService,
              private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit(): void {
    this.message = '';

    this.getSupplierById(this.route.snapshot.paramMap.get('id'));
    this.getAllAddresses();
  }
  private getAllAddresses():void {
    this.supplierService.getAddresses()
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
  private getSupplierById(id: string | number | null):void {
    this.supplierService.getById(id)
      .subscribe(
        data => {
          this.supplier = data;
          this.selectedAddress=data.address.city+" "+data.address.raion+" "+data.address.street+" "+data.address.houseNumber;

        },
        error => {
          console.log(error);
        });
  }
  updateSupplier(playlistForm: { reset: () => void; }): void {
    this.supplier.address=this.selectedAddress;
    this.supplierService.editSupplier(this.supplier.supplierid, this.supplier)
      .subscribe(
        response => {
          // console.log(response);
          this.message = 'The building was updated successfully!';
        },
        error => {
          console.log(error);
        });
    setTimeout(()=>{
      playlistForm.reset();
      this.router.navigate(['/suppliers']);
    }, 1000);
  }
  updatePublished(status: any): void {
    const data = {
      title: this.supplier.title,
      description: this.supplier.supplierName,
      published: status
    };

    this.supplierService.editSupplier(this.supplier.id, data)
      .subscribe(
        response => {
          this.supplier.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }
}
