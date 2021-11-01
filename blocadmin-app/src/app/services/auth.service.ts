import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const AUTH_API = 'http://localhost:8080/api/v1/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = '/api/v1/auth/';
  loginUsername ='';
  constructor(private http: HttpClient) {

  }
  login(username: string, password: string): Observable<any> {
    this.loginUsername=username;
    return this.http.post(this.baseUrl + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: any, email: any, password: any, description: any, name: any, surname: any, idnp: any, mobile: any): Observable<any> {
    return this.http.post(this.baseUrl + 'signup', {
      username,
      email,
      password,
      description,
      name,
      surname,
      idnp,
      mobile
    }, httpOptions);
  }
}
