import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private baseUrl = '/api/v1/password';
  constructor(private http: HttpClient,
              private router: Router,) { }

  sendEmail(email: any): Observable<any>{
    return  this.http.post(`${this.baseUrl}/forgot`,email);
  }
}
