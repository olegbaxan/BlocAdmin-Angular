import { Component, OnInit } from '@angular/core';
import {Flat} from "../../../model/Flat";
import {parameters} from "../../../constants/constants";
import {FlatService} from "../../../services/flat.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage.service";
import {Invoice} from "../../../model/Invoice";
import {InvoiceService} from "../../../services/invoice.service";

@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.css']
})
export class ListInvoiceComponent implements OnInit {

  invoice: any;
  message = '';
  query = '';

  invoices: Invoice[]=[];
  currentIndex = -1;
  title = '';
  loggedUserID: string = '';
  loggedUserName: string = '';
  isLoggedIn: boolean = false;
  page = parameters.page;
  count = parameters.count;
  pageSize = parameters.pageSize;
  pageSizes = parameters.pageSizes;
  constructor(private invoiceService: InvoiceService,
              private route: ActivatedRoute,
              private router: Router,
              private tokenStorageService:TokenStorageService,) { }

  ngOnInit(): void {
    this.retrieveInvoices();
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

  retrieveInvoices() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.invoiceService.getAll(params)
      .subscribe(
        response => {
          const {invoices, totalItems} = response;
          this.invoices = invoices;
          console.log("Invoice",this.invoices);
          this.count = totalItems;
        },
        error => {
          console.log(error);
        });
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveInvoices();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveInvoices();
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
