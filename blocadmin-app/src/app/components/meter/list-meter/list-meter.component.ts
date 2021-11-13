import { Component, OnInit } from '@angular/core';
import {Building} from "../../../model/Building";
import {parameters} from "../../../constants/constants";
import {BuildingService} from "../../../services/building.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage.service";
import {Meter} from "../../../model/Meter";
import {FlatService} from "../../../services/flat.service";
import {MeterService} from "../../../services/meter.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-list-meter',
  templateUrl: './list-meter.component.html',
  styleUrls: ['./list-meter.component.css']
})
export class ListMeterComponent implements OnInit {

  meter: any;
  message = '';
  query = '';

  meters: Meter[] = [];
  currentIndex = -1;
  title = '';
  loggedUserID: string = '';
  loggedUserName: string = '';
  isLoggedIn: boolean = false;
  page = parameters.page;
  count = parameters.count;
  pageSize = parameters.pageSize;
  pageSizes = parameters.pageSizes;
  constructor(private meterService: MeterService,
              private authService:AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private tokenStorageService:TokenStorageService,) { }

  ngOnInit(): void {
    this.retrieveMeters();
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

  retrieveMeters() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.meterService.getAll(params)
      .subscribe(
        response => {
          console.log("Responce",response);
          const {meters, totalItems} = response;
          this.meters = meters;
          console.log("Meters ",this.meters);
          this.count = totalItems;
        },
        error => {
          console.log(error);
          // if(error.error.error=="Unauthorized"){
          //   this.isLoggedIn = false;
          //   window.sessionStorage.removeItem("auth-person");
          //   window.sessionStorage.removeItem("auth-token");
          //   this.router.navigate(['/login']);
          // }
          this.authService.logout(error.error.error);
        });
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveMeters();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveMeters();
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