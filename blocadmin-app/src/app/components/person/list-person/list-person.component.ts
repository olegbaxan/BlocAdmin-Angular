import {Component, Injectable, OnInit} from '@angular/core';
import {EditPersonComponent} from "../edit-person/edit-person.component";
import {Person} from "../../../model/Person";
import {PersonService} from "../../../services/person.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {parameters} from "../../../constants/constants";
import {el} from "@angular/platform-browser/testing/src/browser_util";


@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.css']
})

@Injectable({providedIn: EditPersonComponent})
export class ListPersonComponent implements OnInit {

  person: any;
  message = '';
  query = '';

  persons: Person[] = [];
  currentIndex = -1;
  title = '';
  loggedUserID: string = '';
  loggedUserName: string = '';
  isLoggedIn: boolean = false;
  page = parameters.page;
  count = parameters.count;
  pageSize = parameters.pageSize;
  pageSizes = parameters.pageSizes;

  constructor(private personService: PersonService,
              private route: ActivatedRoute,
              private router: Router,
              public tokenStorageService:TokenStorageService,)
  {
    this.tokenStorageService.getPersonData();
  }
  ngOnInit(): void {
    this.retrievePersons();
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrievePersons() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.personService.getAll(params)
      .subscribe(
        response => {
          const {persons, totalItems} = response;
          this.persons = persons;
          console.log("Persons",this.persons);
          this.count = totalItems;
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrievePersons();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrievePersons();
  }
}
