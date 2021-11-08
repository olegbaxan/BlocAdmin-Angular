import { Component, OnInit } from '@angular/core';
import {MeterService} from "../../../services/meter.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MeterdataService} from "../../../services/meterdata.service";

@Component({
  selector: 'app-edit-meterdata',
  templateUrl: './edit-meterdata.component.html',
  styleUrls: ['./edit-meterdata.component.css']
})
export class EditMeterdataComponent implements OnInit {

  title="Edit meter form";
  meterdata:any;
  message = '';
  meters: any = [];
  selectedMeter: any ;
  status: string []= [];
  selectedStatus: any ;
  constructor(private meterdataService: MeterdataService,
              private meterService: MeterService,
              private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit(): void {
    this.message = '';

    this.getMeterDataById(this.route.snapshot.paramMap.get('id'));
    this.getAllMeters();
    this.getAllStatus();
  }
  private getAllMeters(): void {
    this.meterdataService.getMeters()
      .subscribe(
        response => {
          for (let item in response) {
            response[item].bindName = response[item].serial + " " + response[item].flat.flatNumber;
            this.meters.push(response[item]);

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
          for (let item in response) {
            response[item].bindName = response[item].name;
            this.status.push(response[item]);
          }
        },
        error => {
          console.log(error);
        });
    // return response;
  }
  private getMeterDataById(id: string | number | null):void {
    this.meterdataService.getById(id)
      .subscribe(
        data => {
          this.meterdata = data;
          this.selectedMeter=data.meters;
          this.selectedStatus=data.status.name;
        },
        error => {
          console.log(error);
        });
  }
  updateMeterData(playlistForm: { reset: () => void; }): void {
    this.meterdataService.editMeterData(this.meterdata.meterdataid, this.meterdata)
      .subscribe(
        response => {
          this.message = 'The meterdata was updated successfully!';
        },
        error => {
          console.log(error);
        });
    setTimeout(()=>{
      playlistForm.reset();
      this.router.navigate(['/meterdata']);
    }, 1000);
  }
  updatePublished(status: any): void {
    const data = {
      title: this.meterdata.title,
      description: this.meterdata.meterdataid,
      published: status
    };

    this.meterdataService.editMeterData(this.meterdata.meterdataid, data)
      .subscribe(
        response => {
          this.meterdata.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

}
