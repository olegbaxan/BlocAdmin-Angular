import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


const endpoint = 'https://jsonplaceholder.typicode.com/posts';
@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private baseUrl = '/api/v1/address';

  constructor(private http: HttpClient) {
  }

  // getAll(): Observable<any> {
  //   // return this.http.get('/api/rest/address');
  //   return this.http.get(this.baseUrl);
  // }

  getById(id: string | number | null): Observable<any> {
    // return this.http.get('/api/rest/address/'+id);
    return this.http.get(`${this.baseUrl}/${id}`);

  }
  deleteAddress(id:number){
    return  this.http.delete(`${this.baseUrl}/${id}`);
  }
  createAddress(address: any): Observable<any>{
    return  this.http.post(this.baseUrl,address);
  }
  editAddress(id:number, address:Object){
    return  this.http.put(this.baseUrl,address);
  }
  searchAddress(search:any){
    return  this.http.get(`${this.baseUrl}/search/${search}`);
  }

  pageAddress(pageNo:number, pageSize:number){
    return this.http.get(`${this.baseUrl}/page/${pageNo}/of/${pageSize}`);
  }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(this.baseUrl, { params });
  }
}
