import {Person} from "./Person";
import {Flat} from "./Flat";
import {Supplier} from "./Supplier";
import {MeterType} from "./MeterType";
import {TypeOfMeterAndInvoice} from "./TypeOfMeterAndInvoice";

export class Meter {

  meterid?: undefined;
  meterType: MeterType | undefined;
  serial?: String;
  initialValue?: any;
  typeOfMeterAndInvoice: TypeOfMeterAndInvoice | undefined;
  supplier?: Supplier;
  flat?: Flat;
  person?: Person;
}
