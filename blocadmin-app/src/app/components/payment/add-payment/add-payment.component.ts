import {Component, OnInit} from '@angular/core';
import {Meter} from "../../../model/Meter";
import {MeterService} from "../../../services/meter.service";
import {FlatService} from "../../../services/flat.service";
import {PersonService} from "../../../services/person.service";
import {SupplierService} from "../../../services/supplier.service";
import {Payments} from "../../../model/Payments";
import {Flat} from "../../../model/Flat";
import {Person} from "../../../model/Person";
import {PaymentsService} from "../../../services/payments.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {Invoice} from "../../../model/Invoice";
import {InvoiceService} from "../../../services/invoice.service";
import {MeterdataService} from "../../../services/meterdata.service";
import {Status} from "../../../model/Status";
import {waitForAsync} from "@angular/core/testing";

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {
  submitted = false;
  persons: any = [];
  flats: Flat[];
  payments: Payments[];
  invoices: Invoice[] = [];
  updatedFlat: Flat | undefined;
  status: Status[] = [];
  message:string="";
  showMsg= false;
  selectedPerson: any = [];
  selectedFlats: any;

  constructor(private paymentService: PaymentsService,
              private flatService: FlatService,
              private meterdataService: MeterdataService,
              private invoiceService: InvoiceService,
              public tokenStorageService: TokenStorageService,) {
    this.tokenStorageService.getPersonData();
    this.payments = [];
    this.flats = [];
  }

  ngOnInit(): void {
    this.getAllPersons();
    this.getAllStatus();
  }

  private getAllPersons(): void {
    this.paymentService.getPersons()
      .subscribe(
        response => {
          this.persons = [];
          for (let item in response) {
            response[item].bindName = response[item].name + " " + response[item].surname;
            this.persons.push(response[item]);

          }
          console.log("Persons ", this.persons)
        },
        error => {
          console.log(error);
        });
    // return response;
  }


  getPersonFlats(): void {
    this.paymentService.getPersonFlats(this.selectedPerson.personid)
      .subscribe(
        response => {
          this.flats = [];
          this.invoices = [];
          for (let item in response) {
            response[item].bindName = response[item].flatNumber + " " + response[item].building.address.city;
            this.flats.push(response[item]);
            this.getFlatInvoices(response[item].flatid);
          }
          this.initPayments();
        },
        error => {
          console.log(error);
        });
    // return response;
  }

  getFlatInvoices(flatid: any): void {
    this.paymentService.getFlatInvoices(flatid)
      .subscribe(
        response => {
          for (let item in response) {
            response[item].bindName = response[item].invoiceId + " " + response[item].emittedDate;
            this.invoices.push(response[item]);
          }
          console.log("invoices:t", this.invoices);
        },
        error => {
          console.log(error);
        });
    // return response;
  }

  initPayments() {

    this.payments = [];
    this.flats?.forEach((flat) => {
      let payment = new Payments();
      payment.flat = flat;
      payment.person = this.selectedPerson;
      payment.sum = 0;
      this.payments.push(payment);
    })
    console.log("payments:t", this.payments);
  }

  savePayment(): void {
    console.log(this.payments);
    this.paymentService.createPayments(this.payments)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.checkAndPayInvoices();
        },
        error => {
          console.log(error);
        });
  }

  checkAndPayInvoices(): void {
    for (let i=0;i<this.invoices.length;i++) {
      console.log("Iteration = ",i);
      // getFlatByFLatID
      // @ts-ignore
      this.flatService.getById(this.invoices[i]?.meter?.flat?.flatid)
        .subscribe(
          data => {
            this.updatedFlat = data;
            console.log("InvoiceID",this.invoices[i].invoiceId);
            console.log("UpdatedFlatbef",this.updatedFlat?.wallet);
            console.log("InvoceSum",this.invoices[i].invoiceSum);
            //check and withdrow money acording to invoicesum
            // @ts-ignore
            if (this.updatedFlat?.wallet > this.invoices[i]?.invoiceSum) {
              console.log("UpdatedFlat",this.updatedFlat);
              console.log("Invoice",this.invoices[i]);
              console.log("Wallet ",this.updatedFlat?.wallet,this.invoices[i].invoiceSum);
              //UpdateFlatWallet
              // @ts-ignore
              this.updatedFlat?.wallet = this.updatedFlat?.wallet - this.invoices[i].invoiceSum;
              console.log("After withdrow invoiceId ? flat ?",this.invoices[i].invoiceId,this.updatedFlat?.wallet);

              //UpdateInvoiceStatus
              this.invoices[i].status = this.status[2];//Invoice_payed
              // @ts-ignore
              this.flatService.editFlat(this.updatedFlat?.flatid,this.updatedFlat)
                .subscribe(
                  response => {
                    console.log("Flat updated",this.updatedFlat?.wallet)
                    this.message = 'The flat '+this.updatedFlat?.flatNumber+' was updated successfully!';
                    this.showMsg= true;
                    this.updatedFlat=undefined;
                    // @ts-ignore
                    this.invoiceService.editInvoice(this.invoices[i]?.invoiceId,this.invoices[i])
                      .subscribe(response => {
                          console.log("Invoice updated",this.invoices[i].status);
                          this.message = 'The Status was updated successfully!';
                          this.showMsg= true;
                        },
                        error => {
                          console.log(error);
                        })
                  },
                  error => {
                    console.log(error);
                  });
            }
          },
          error => {
            console.log(error);
          });//get flat by ID

    }//for loop

  }

  //  checkAndPayInvoices(): void {
  //
  // }
  // async passInvoices(){
  //   this.invoices?.forEach((invoice) => {
  //     //getFlatByFLatID
  //     // @ts-ignore
  //     this.flatService.getById(invoice.meter?.flat?.flatid)
  //       .subscribe(
  //         data => {
  //           this.updatedFlat = data;
  //           console.log("UpdatedFlat",this.updatedFlat);
  //           console.log("Invoice",invoice);
  //           console.log("Wallet ",this.updatedFlat?.wallet,invoice.invoiceSum);
  //           //check and withdrow money acording to invoicesum
  //           // @ts-ignore
  //           if (this.updatedFlat?.wallet > invoice?.invoiceSum) {
  //             //UpdateFlatWallet
  //             // @ts-ignore
  //             this.updatedFlat?.wallet = this.updatedFlat?.wallet - invoice.invoiceSum;
  //             //UpdateInvoiceStatus
  //             invoice.status = this.status[2];//Invoice_payed
  //             this.updateFlat(this.updatedFlat);
  //             this.updateInvoice(invoice);
  //           }
  //         },
  //         error => {
  //           console.log(error);
  //         });
  //   })
  // }
  // async updateFlat(updateFlat:Flat|undefined):Promise<void>{
  //   // @ts-ignore
  //   this.flatService.editFlat(updateFlat?.flatid,updateFlat)
  //     .subscribe(
  //       response => {
  //         this.message = 'The flat '+updateFlat?.flatNumber+' was updated successfully!';
  //         this.showMsg= true;
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }
  //
  //
  // async updateInvoice(invoice: Invoice):Promise<void>{
  //   // @ts-ignore
  //   this.invoiceService.editInvoice(invoice?.invoiceId,invoice)
  //     .subscribe(response => {
  //         this.message = 'The Status was updated successfully!';
  //         this.showMsg= true;
  //       },
  //       error => {
  //         console.log(error);
  //       })
  // }

  // checkAndPayInvoices(): void {
  //   let i=0;
  //   this.invoices?.forEach((invoice) => {
  //     console.log("Iteration = ",i++);
  //     //getFlatByFLatID
  //     // @ts-ignore
  //     this.flatService.getById(invoice.meter?.flat?.flatid)
  //       .subscribe(
  //         data => {
  //           this.updatedFlat = data;
  //           console.log("UpdatedFlat",this.updatedFlat);
  //           console.log("Invoice",invoice);
  //           console.log("Wallet ",this.updatedFlat?.wallet,invoice.invoiceSum);
  //           //check and withdrow money acording to invoicesum
  //           // @ts-ignore
  //           if (this.updatedFlat?.wallet > invoice?.invoiceSum) {
  //             //UpdateFlatWallet
  //             // @ts-ignore
  //             this.updatedFlat?.wallet = this.updatedFlat?.wallet - invoice.invoiceSum;
  //             console.log("After withdrow",this.updatedFlat);
  //
  //             //UpdateInvoiceStatus
  //             invoice.status = this.status[2];//Invoice_payed
  //             // @ts-ignore
  //             this.flatService.editFlat(this.updatedFlat?.flatid,this.updatedFlat)
  //               .subscribe(
  //                 response => {
  //                   this.message = 'The flat '+this.updatedFlat?.flatNumber+' was updated successfully!';
  //                   this.showMsg= true;
  //                   // @ts-ignore
  //                   this.invoiceService.editInvoice(invoice?.invoiceId,invoice)
  //                     .subscribe(response => {
  //                       this.message = 'The Status was updated successfully!';
  //                       this.showMsg= true;
  //                     },
  //                     error => {
  //                       console.log(error);
  //                     })
  //                 },
  //                 error => {
  //                   console.log(error);
  //                 });
  //           }
  //           this.updatedFlat=undefined;
  //         },
  //         error => {
  //           console.log(error);
  //         });
  //   })
  //
  // }


  newPayment(): void {
    this.initPayments();
  }

  private getAllStatus(): void {
    this.meterdataService.getStatus()
      .subscribe(
        response => {
          this.status = [];
          this.status = response;
        },
        error => {
          console.log(error);
        });
    // return response;
  }

}
