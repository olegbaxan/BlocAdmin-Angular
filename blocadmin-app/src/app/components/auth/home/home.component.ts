import { Component, OnInit } from '@angular/core';
import {PersonService} from "../../../services/person.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage.service";
import {Person} from "../../../model/Person";
import {InvoiceService} from "../../../services/invoice.service";
import {Invoice} from "../../../model/Invoice";
import {Parser} from "@angular/compiler";
import {PaymentsService} from "../../../services/payments.service";
import {Payments} from "../../../model/Payments";
import {Location} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  person:Person|undefined;
  invoices:Invoice[]=[];
  invoicesS:Invoice[]=[];
  payments:Payments[]=[];
  showModal: boolean = false;
  showModalS: boolean = false;
  showModalPay: boolean = false;
  showModalPerson: boolean = false;
  content: any;
  title: any;
  selectedInvoice:Invoice|undefined;
  selectedInvoiceS:Invoice|undefined;
  selectedPayment:Payments|undefined;




  constructor(private personService: PersonService,
              private invoiceService: InvoiceService,
              private paymentsService: PaymentsService,
              private router: Router,
              private _location: Location,
              public tokenStorageService:TokenStorageService,)
  {
    this.tokenStorageService.getPersonData();
  }

  ngOnInit(): void {
    console.log('home');
    this.personService.getPublicContent().subscribe(
      data => {
        this.content = data;

      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );

    this.getPersonById(this.tokenStorageService.loggedUserID);
    this.getPersonInvoices(this.tokenStorageService.loggedUserID);
    this.getSupplierInvoices();
    this.getPayments(this.tokenStorageService.loggedUserID);
  }
  private getPersonById(id: string | number | null):void {
    this.personService.getById(id)
      .subscribe(
        data => {
          this.person = data;
          console.log("Person Data",data);
        },
        error => {
          console.log(error);
        });
  }
  updatePerson(playlistForm: { reset: () => void; }): void {
    this.personService.editPerson(this.person?.personid, this.person)
      .subscribe(
        response => {
        },
        error => {
          console.log(error);
        });
    setTimeout(()=>{
      this.hideModals();
      this.router.navigate(['/home']);

    }, 50);
  }
  private getPersonInvoices(loggedUserID: any) {
    this.invoiceService.getInvoicesByPersonId(loggedUserID)
      .subscribe(
        data => {
          for (let i=0;i<10;i++){
            if(data[i]){
              this.invoices.push(data[i]);
            }
          }

          console.log("Invoces Data",this.invoices);
        },
        error => {
          console.log(error);
        });
  }
  private getSupplierInvoices() {
    this.invoiceService.getInvoicesBySuppliers()
      .subscribe(
        data => {
          this.invoicesS = data;
          console.log("Invoices SupplierData",this.invoicesS);
        },
        error => {
          console.log(error);
        });
  }
  private getPayments(loggedUserID: any) {
    this.paymentsService.getPersonPayments(loggedUserID)
      .subscribe(
        data => {
          this.payments = data;
          console.log("payments ",this.payments);
        },
        error => {
          console.log(error);
        });
  }

  //Bootstrap Modal Open event
  showInvoices(id:any) {
    this.showModal = true; // Show-Hide Modal Check
    this.selectedInvoiceS=undefined;
    this.selectedInvoice=this.invoices[id];
    console.log("Selected Invoice",this.selectedInvoice);
  }
  showInvoicesS(id:any) {
    this.showModalS = true; // Show-Hide Modal Check
    this.selectedInvoice=undefined;
    this.selectedInvoiceS=this.invoicesS[id];
    console.log("Selected InvoiceS",this.selectedInvoiceS);
  }
  showPayments(id:any) {
    this.showModalPay = true; // Show-Hide Modal Check
    this.selectedPayment=this.payments[id];
    console.log("Selected selectedPayment",this.selectedPayment);
  }
  showEditPerson() {
    this.showModalPerson = true; // Show-Hide Modal Check
  }

  //Bootstrap Modal Close event
  hideModals() {
    this.showModal = false;
    this.showModalS = false;
    this.showModalPay=false;
    this.showModalPerson=false;
  }
  backClicked() {
    this._location.back();
  }
}
