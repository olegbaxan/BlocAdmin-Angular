import {Address} from "./Address";
import {Building} from "./Building";
import {Person} from "./Person";
import {Meter} from "./Meter";


export class Flat {

  flatid: undefined;
  floor?: undefined;
  flatNumber?: undefined;
  numberOfPerson?: any;
  ladder?: any;
  wallet?: any;
  person?: Person[];
  building?: Building;
  meters?: Meter[];

}
