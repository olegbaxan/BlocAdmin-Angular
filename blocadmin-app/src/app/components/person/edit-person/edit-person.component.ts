import { Component, OnInit } from '@angular/core';

import {PersonService} from "../../../services/person.service";
import {ActivatedRoute, Router} from "@angular/router";

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
  checkValue = false;
  selectedRoles:any=[];
  constructor(private personService: PersonService,
              private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit(): void {
    this.message = '';

    this.getPersonById(this.route.snapshot.paramMap.get('id'));
    this.getAllRoles();
  }
  private getAllRoles():void {
    this.personService.getRoles()
      .subscribe(
        response => {
          this.roles = response;
          console.log("roles",this.roles);
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
          console.log("User",data);
          console.log("person.rolesbyID ",data.roles);
          console.log("selectedRoleByID ",this.selectedRoles);
        },
        error => {
          console.log(error);
        });
  }
  updatePerson(playlistForm: { reset: () => void; }): void {
    console.log("Roles update= ",this.person.roles);
    console.log("selectedROle ",this.selectedRoles);
    console.log("person ",this.person);
    this.personService.editPerson(this.person.personid, this.person)
      .subscribe(
        response => {
          // console.log(response);
          this.message = 'The person was updated successfully!';
        },
        error => {
          console.log(error);
        });
    setTimeout(()=>{
      playlistForm.reset();
      this.router.navigate(['/person']);
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
}
