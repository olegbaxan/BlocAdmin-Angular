import {Component, OnInit} from '@angular/core';
import {Address} from "../../../model/Address";
import {Person} from "../../../model/Person";
import {AddressService} from "../../../services/address.service";
import {PersonService} from "../../../services/person.service";

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {

  person: Person = {
    personid: undefined,
    username: '',
    name: '',
    surname: '',
    email: '',
    description: '',
    phone: '',
    mobile: '',
    idnp: '',
  };
  submitted = false;

  constructor(private personService: PersonService) {
  }

  ngOnInit(): void {
  }

  savePerson(): void {
    const data = {
      username: this.person.username,
      name: this.person.name,
      surname: this.person.surname,
      email: this.person.email,
      description: this.person.description,
      phone: this.person.phone,
      mobile: this.person.mobile,
      idnp: this.person.idnp,
    };

    this.personService.createPerson(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
  newPerson(): void {
    this.submitted = false;
    this.person = {
      personid: undefined,
      username: '',
      name: '',
      surname: '',
      email: '',
      description: '',
      phone: '',
      mobile: '',
      idnp: '',
    };
  }
}

