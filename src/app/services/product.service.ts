import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/v1/marketplace/';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${baseUrl}products/list`);
  }

  get(id: string): Observable<any> {
    return this.http.get(`${baseUrl}products/list`, { headers: { id } });
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}product`, data);
  }

  update(data: any): Observable<any> {
    return this.http.patch(`${baseUrl}product`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: string): Observable<any> {
    return this.http.get(`${baseUrl}?title=${title}`);
  }
}
