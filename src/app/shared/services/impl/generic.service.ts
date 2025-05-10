import { Injectable } from '@angular/core';
import { IGenericService } from '../IGenericService';
import { Observable } from 'rxjs';
import { RequestResponse } from '../../models/request.response.model';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenericService implements IGenericService {
  protected baseUrl: string ="";
  protected apiUrl: string = environment.apiUrl;
  protected endPoint: string ="";
  
  constructor(protected http: HttpClient) {

  }
  getAll(size=10, page=0): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${this.baseUrl}?size=${size}&page=${page}`);
  }
  getById(id: number): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${this.baseUrl}/${id}`);
  }
  create(data: any): Observable<RequestResponse> {
    return this.http.post<RequestResponse>(`${this.baseUrl}`, data);
  }
  update(id: number, data: any): Observable<RequestResponse> {
    return this.http.put<RequestResponse>(`${this.baseUrl}/${id}`, data);
  }
  delete(id: number): Observable<RequestResponse> {
    return this.http.delete<RequestResponse>(`${this.baseUrl}/${id}`);
  }
}
