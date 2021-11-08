import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MeterdataService {

  private baseUrl = '/api/v1/meterdata';

  constructor(private http: HttpClient) {
  }


  getById(id: string | number | null): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);

  }

  createMeterData(meterdata: any): Observable<any> {
    return this.http.post(this.baseUrl, meterdata);
  }

  editMeterData(id: number, meterdata: Object) {
    return this.http.put(this.baseUrl, meterdata);
  }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl, {params});
  }

  getMeters(): Observable<any> {
    return this.http.get(`${this.baseUrl}/meters`);
  }

  getStatus(): Observable<any> {
    return this.http.get(`${this.baseUrl}/status`);
  }

  getPreviuosMeterData(id: any) {
    return this.http.get(`${this.baseUrl}/getprevious/${id}`);
  }
}
