import {Meter} from "./Meter";
import {Status} from "./Status";


export class MeterData {

  meterdataid?: undefined;
  previousValue?: any;
  currentValue?: any;
  meterValue?: any;
  status?: Status;
  meter?: Meter;
}
