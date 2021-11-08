import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private baseUrl = '/api/v1/invoices';

  constructor(private http: HttpClient) { }


  getById(id: string | number | null): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);

  }
  createInvoice(invoice: any): Observable<any>{
    return  this.http.post(this.baseUrl,invoice);
  }
  editInvoice(id:number, invoice:Object){
    return  this.http.put(this.baseUrl,invoice);
  }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl, { params });
  }

  getSuppliers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/supplier`);
  }
  getMeters(): Observable<any> {
    return this.http.get(`${this.baseUrl}/meters`);
  }
  getTypeOfMeterAndInvoice(): Observable<any> {
    return this.http.get(`${this.baseUrl}/typeofmeterandinvoice`);
  }
}
