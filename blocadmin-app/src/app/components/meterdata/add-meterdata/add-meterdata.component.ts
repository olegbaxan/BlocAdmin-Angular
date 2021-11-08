import { Component, OnInit } from '@angular/core';
import {MeterService} from "../../../services/meter.service";
import {MeterData} from "../../../model/MeterData";
import {MeterdataService} from "../../../services/meterdata.service";
import {Meter} from "../../../model/Meter";
import {Status} from "../../../model/Status";

@Component({
  selector: 'app-add-meterdata',
  templateUrl: './add-meterdata.component.html',
  styleUrls: ['./add-meterdata.component.css']
})
export class AddMeterdataComponent implements OnInit {

  meterdata: MeterData = {
    meterdataid: undefined,
    currentValue: undefined,
    previousValue: undefined,
    meter: undefined,
    status:undefined,
  };

  submitted = false;
  meters: Meter[] = [];
  selectedMeter: any;
  status:Status[] = [];
  selectedStatus:any;

  constructor(private meterdataService: MeterdataService,
              private meterService: MeterService,
              ) {
  }

  ngOnInit(): void {
    this.getAllMeters();
    this.getAllStatus();
  }

  private getAllMeters(): void {
    this.meterdataService.getMeters()
      .subscribe(
        response => {
          console.log("Responce",response);
          for (let item in response) {
            response[item].bindName = response[item].serial;
            this.meters.push(response[item]);
            console.log("Meters ",this.meters)
          }
        },
        error => {
          console.log(error);
        });
    // return response;
  }

  private getAllStatus(): void {
    this.meterdataService.getStatus()
      .subscribe(
        response => {
          this.status = response;
        },
        error => {
          console.log(error);
        });
    // return response;
  }

  saveMeterData(): void {
    const data = {
      previousValue: this.meterdata.previousValue,
      currentValue: this.meterdata.currentValue,
      meter: this.selectedMeter,
      status: this.meterdata.status,

    };
    this.meterdataService.createMeterData(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newMeterData(): void {
    this.submitted = false;

    this.meterdata = {
      meterdataid: undefined,
      currentValue: undefined,
      previousValue: undefined,
      meter: undefined,
      status:undefined,
    };
  }

  getPreviousValue() {

    const meterid = this.selectedMeter.meterid;
    this.meterdataService.getPreviuosMeterData(meterid)
      .subscribe(
        response => {
          if(response==null){
            this.meterdata.previousValue=this.selectedMeter.initialValue;
          }else {
            this.meterdata.previousValue=response;
          }
        },
        error => {
          console.log(error);
        });
  }
}
