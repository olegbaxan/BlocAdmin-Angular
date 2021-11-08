import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MeterService {
  private baseUrl = '/api/v1/meters';

  constructor(private http: HttpClient) { }


  getById(id: string | number | null): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);

  }
  createMeter(meter: any): Observable<any>{
    return  this.http.post(this.baseUrl,meter);
  }
  editMeter(id:number, meter:Object){
    return  this.http.put(this.baseUrl,meter);
  }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl, { params });
  }

  getPersons(): Observable<any> {
    return this.http.get(`${this.baseUrl}/person`);
  }
  getFlats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/flats`);
  }
  getSuppliers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/supplier`);
  }
  getMeterType(): Observable<any> {
    return this.http.get(`${this.baseUrl}/metertype`);
  }
  getTypeOfMeterAndInvoice(): Observable<any> {
    return this.http.get(`${this.baseUrl}/typeofmeterandinvoice`);
  }
}
