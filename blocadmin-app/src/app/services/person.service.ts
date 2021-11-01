import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private baseUrl = '/api/v1/person';

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(this.baseUrl + '/all', { responseType: 'text' });
  }

  getPersonBoard(): Observable<any> {
    return this.http.get(this.baseUrl + '/user', { responseType: 'text' });
  }

  getBlocAdminBoard(): Observable<any> {
    return this.http.get(this.baseUrl + '/mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(this.baseUrl + '/admin', { responseType: 'text' });
  }
  getById(id: string | number | null): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);

  }
  createPerson(address: any): Observable<any>{
    return  this.http.post(this.baseUrl,address);
  }
  editPerson(id:number, person:Object){
    return  this.http.put(this.baseUrl,person);
  }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl, { params });
  }

  getRoles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/roles`);
  }
}
