import {Meter} from "./Meter";
import {TypeOfMeterAndInvoice} from "./TypeOfMeterAndInvoice";
import {Supplier} from "./Supplier";

export class Invoice {

  invoiceId: undefined;
  invoiceNumber?: string;
  meterDataCurrent?: any;
  meterDataPrevious?: any;
  invoiceSum?: any;
  unitPrice?: any;
  payTill?: any;
  emittedDate?: any;
  dateOfPay?: any;
  typeOfMeterAndInvoice: TypeOfMeterAndInvoice | undefined;
  supplier?: Supplier;
  meter?: Meter;
}
