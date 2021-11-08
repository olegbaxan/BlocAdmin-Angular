import { Component, OnInit } from '@angular/core';
import {Invoice} from "../../../model/Invoice";
import {InvoiceService} from "../../../services/invoice.service";


@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {

  invoice: Invoice = {
    invoiceId: undefined,
    invoiceNumber: undefined,
    meterDataCurrent: undefined,
    meterDataPrevious: undefined,
    invoiceSum: undefined,
    unitPrice: undefined,
    payTill: undefined,
    emittedDate: undefined,
    dateOfPay: undefined,
    typeOfMeterAndInvoice: undefined,
    supplier: undefined,
    meter: undefined,
  };

  submitted = false;
  suppliers: any= [];
  meters: any= [];
  typeOfMeterAndInvoices: any = [];
  selectedTypeOfMeterAndInvoice: any;
  // selectedSupplier: any ;
  selectedMeter: any ;

  constructor(private invoiceService: InvoiceService) {
  }

  ngOnInit(): void {
    this.getAllMeters();
    this.getAllSuppliers();
    this.getAllTypeOfMeterAndInvoice()
  }


  private getAllMeters(): void {
    this.invoiceService.getMeters()
      .subscribe(
        response => {
          for (let item in response) {
            response[item].bindName = response[item].serial;
            this.meters.push(response[item]);
            console.log("this.meters ",this.meters );
          }
        },
        error => {
          console.log(error);
        });
    // return response;
  }
  private getAllSuppliers(): void {
    this.invoiceService.getSuppliers()
      .subscribe(
        response => {
          for (let item in response) {
            response[item].bindName = response[item].supplierName;
            this.suppliers.push(response[item]);
            console.log("this.supplier ",this.suppliers );
          }
        },
        error => {
          console.log(error);
        });
    // return response;
  }
  private getAllTypeOfMeterAndInvoice(): void {
    this.invoiceService.getTypeOfMeterAndInvoice()
      .subscribe(
        response => {
          this.typeOfMeterAndInvoices = response;
        },
        error => {
          console.log(error);
        });
    // return response;
  }

  saveInvoice(): void {
    const data = {
      invoiceNumber: this.invoice.invoiceNumber,
      meterDataCurrent: this.invoice.meterDataCurrent,
      meterDataPrevious: this.invoice.meterDataPrevious,
      invoiceSum: this.invoice.invoiceSum,
      unitPrice: this.invoice.unitPrice,
      payTill: this.invoice.payTill,
      emittedDate: this.invoice.emittedDate,
      dateOfPay: this.invoice.dateOfPay,
      typeOfMeterAndInvoice: this.invoice.typeOfMeterAndInvoice,
      supplier: this.invoice.supplier,
      meter: this.invoice.meter,
    };
    console.log("SaveInvoice",data);
    this.invoiceService.createInvoice(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newInvoice(): void {
    this.submitted = false;

    this.invoice = {
      invoiceId: undefined,
      invoiceNumber: undefined,
      meterDataCurrent: undefined,
      meterDataPrevious: undefined,
      invoiceSum: undefined,
      unitPrice: undefined,
      payTill: undefined,
      emittedDate: undefined,
      dateOfPay: undefined,
      typeOfMeterAndInvoice: undefined,
      supplier: undefined,
      meter: undefined,
    };
  }

}
