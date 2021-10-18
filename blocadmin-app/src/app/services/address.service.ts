import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private baseUrl = '/api/v1/address';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    // return this.http.get('/api/rest/address');
    return this.http.get(this.baseUrl);
  }

  getById(id: string | number | null): Observable<any> {
    // return this.http.get('/api/rest/address/'+id);
    return this.http.get(`${this.baseUrl}/${id}`);

  }
  deleteAddress(id:number){
    return  this.http.delete(`${this.baseUrl}?id=${id}`);
  }
  createAddress(address:Object){
    return  this.http.post(this.baseUrl,address);
  }
  editAddress(id:number, address:Object){
    return  this.http.put(`${this.baseUrl}?id=${id}`,address);
  }
}
