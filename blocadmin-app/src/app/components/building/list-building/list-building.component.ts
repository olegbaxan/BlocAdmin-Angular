import { Component, OnInit } from '@angular/core';
import {Supplier} from "../../../model/Supplier";
import {parameters} from "../../../constants/constants";
import {Building} from "../../../model/Building";
import {SupplierService} from "../../../services/supplier.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage.service";
import {BuildingService} from "../../../services/building.service";

@Component({
  selector: 'app-list-building',
  templateUrl: './list-building.component.html',
  styleUrls: ['./list-building.component.css']
})
export class ListBuildingComponent implements OnInit {
  building: any;
  message = '';
  query = '';

  buildings: Building[] = [];
  currentIndex = -1;
  title = '';
  loggedUserID: string = '';
  loggedUserName: string = '';
  isLoggedIn: boolean = false;
  page = parameters.page;
  count = parameters.count;
  pageSize = parameters.pageSize;
  pageSizes = parameters.pageSizes;
  constructor(private buildingService: BuildingService,
              private route: ActivatedRoute,
              private router: Router,
              private tokenStorageService:TokenStorageService,) { }

  ngOnInit(): void {
    this.retrieveBuildings();
    this.getPerson();
  }
  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveBuildings() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.buildingService.getAll(params)
      .subscribe(
        response => {
          const {buildings, totalItems} = response;
          this.buildings = buildings;

          this.count = totalItems;
        },
        error => {
          console.log(error);
        });
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveBuildings();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveBuildings();
  }
  getPerson() {
    const personKey = this.tokenStorageService.getPerson();
    if (personKey) {
      this.isLoggedIn=true;
      this.loggedUserID=personKey.id;
      this.loggedUserName=personKey.username;
    }else {
      this.router.navigate(['/login']);
    }
  }

}
