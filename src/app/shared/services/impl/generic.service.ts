import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IGenericService } from '../IGenericService';
import { environment } from '../../../../environments/environment.development';
import { RequestResponse } from '../../models/request.response.model';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenericService implements IGenericService {
  protected baseUrl: string = "";
  protected apiUrl: string = environment.apiUrl;
  protected endPoint: string = "";
  protected size: number = environment.size;
  protected page: number = environment.page;

  constructor(protected http: HttpClient) {
    this.baseUrl = `${this.apiUrl}/${this.endPoint}`;
  }

  getAll(page?: number, size?: number): Observable<RequestResponse> {
    const currentPage = page ?? this.page;
    const currentSize = size ?? this.size;

    return this.http.get<any[]>(`${this.baseUrl}?_page=${currentPage + 1}&_limit=${currentSize}`, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any[]>) => {
          const totalElements = parseInt(response.headers.get('X-Total-Count') || '0', 10);
          const totalPages = Math.ceil(totalElements / currentSize);

          const result: RequestResponse = {
            status: response.status,
            results: response.body,
            type: 'SUCCESS',
            totalElements,
            totalPages,
            size: currentSize,
            currentPage,
            hasNextPage: currentPage + 1 < totalPages,
            hasPreviousPage: currentPage > 0
          };

          return result;
        })
      );
  }

  getById(id: string): Observable<RequestResponse> {
    return this.http.get<any>(`${this.baseUrl}/${id}`, { observe: 'response' })
      .pipe(
        map((response) => ({
          status: response.status,
          results: response.body,
          type: 'SUCCESS'
        } as RequestResponse))
      );
  }

  create(data: any): Observable<RequestResponse> {
    return this.http.post<any>(this.baseUrl, data, { observe: 'response' })
      .pipe(
        map((response) => ({
          status: response.status,
          results: response.body,
          type: 'SUCCESS'
        } as RequestResponse))
      );
  }

  update(id: string, data: any): Observable<RequestResponse> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data, { observe: 'response' })
      .pipe(
        map((response) => ({
          status: response.status,
          results: response.body,
          type: 'SUCCESS'
        } as RequestResponse))
      );
  }

  delete(id: string): Observable<RequestResponse> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`, { observe: 'response' })
      .pipe(
        map((response) => ({
          status: response.status,
          results: response.body,
          type: 'SUCCESS'
        } as RequestResponse))
      );
  }

  get(url: string): Observable<RequestResponse> {
    return this.http.get<any>(`${this.baseUrl}/${url}`, { observe: 'response' })
      .pipe(
        map((response) => ({
          status: response.status,
          results: response.body,
          type: 'SUCCESS'
        } as RequestResponse))
      );
  }
}
