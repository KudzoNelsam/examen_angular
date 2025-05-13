import { Injectable } from '@angular/core';
import { IDashboardService } from '../IDashboardService';
import { Observable } from 'rxjs';
import { RequestResponse } from '../../models/request.response.model';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends GenericService implements IDashboardService {

  constructor(http: HttpClient) {
    super(http);
    this.endPoint = 'dashboard';
    this.baseUrl = `${this.apiUrl}/${this.endPoint}`;
    this.size = 10;
  }
  getSummary(departementId: number, periodeId: number, page: number = this.page, size: number = this.size): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${this.baseUrl}?size=${size}&page=${page}${periodeId ? '&periodeId=' + periodeId : ''}${departementId ? '&departementId=' + departementId : ''}`);
  }
}
