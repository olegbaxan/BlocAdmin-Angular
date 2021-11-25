import { Component, OnInit } from '@angular/core';

import {PersonService} from "../../../services/person.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {
  title="Edit person form";
  person:any;
  message = '';
  roles:any = [];
  selectedRoles:any=[];
  constructor(private personService: PersonService,
              private route: ActivatedRoute,
              private router: Router,
              private _location: Location,
              public tokenStorageService:TokenStorageService,)
  {
    this.tokenStorageService.getPersonData();
  }

  ngOnInit(): void {
    this.message = '';

    this.getPersonById(this.route.snapshot.paramMap.get('id'));
    this.getAllRoles();
  }
  private getAllRoles():void {
    this.personService.getRoles()
      .subscribe(
        response => {
          this.roles=[];
          this.roles = response;
        },
        error => {
          console.log(error);
        });
    // return response;
  }
  private getPersonById(id: string | number | null):void {
    this.personService.getById(id)
      .subscribe(
        data => {
          this.person = data;
          this.selectedRoles=data.roles;
        },
        error => {
          console.log(error);
        });
  }
  updatePerson(playlistForm: { reset: () => void; }): void {
    this.personService.editPerson(this.person.personid, this.person)
      .subscribe(
        response => {
        },
        error => {
          console.log(error);
        });
    setTimeout(()=>{
      playlistForm.reset();
      if(this.tokenStorageService.isAdmin || this.tokenStorageService.isManager){
        this.router.navigate(['/person']);
      }else  this.router.navigate(['/home']);

    }, 1000);
  }
  updatePublished(status: any): void {
    const data = {
      title: this.person.title,
      description: this.person.username,
      published: status
    };

    this.personService.editPerson(this.person.id, data)
      .subscribe(
        response => {
          this.person.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }
  backClicked() {
    this._location.back();
  }
}
