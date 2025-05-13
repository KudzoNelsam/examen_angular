import { Injectable } from '@angular/core';
import { IEmployeService } from '../IEmployeService';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestResponse } from '../../models/request.response.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeService extends GenericService implements IEmployeService {

  constructor(http: HttpClient) {
    super(http);
    this.endPoint = "employes";
    this.baseUrl = `${this.apiUrl}/${this.endPoint}`;
    this.size = 10;
  }
  generateAll(periode: number): Observable<RequestResponse> {
    return this.http.post<RequestResponse>(`${this.baseUrl}/bulletin?periodeId=${periode}`,null);
  }
  generateBulletin(id: number, periode: number): Observable<RequestResponse> {
    return this.http.post<RequestResponse>(`${this.baseUrl}/${id}/bulletin?periodeId=${periode}`,null);
  }
  getWithDatas(id: number, page: number = this.page, size: number = this.size): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${this.baseUrl}/${id}/datas?size=${size}&page=${page}`);
  }
  getWithRemunerations(id: number, page: number = this.page, size: number = this.size): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${this.baseUrl}/${id}/remunerations?size=${size}&page=${page}`);
  }
  getWithBulletins(id: number, page: number = this.page, size: number = this.size): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${this.baseUrl}/${id}/bulletins?size=${size}&page=${page}`);
  }
  filter(champ?: string, statut?: string, departementId?: number, page: number = this.page, size: number = this.size): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${this.baseUrl}?size=${size}&page=${page}${champ ? '&champ=' + champ : ''}${statut ? '&statut=' + statut : ''}${departementId ? '&departementId=' + departementId : ''}`);
  }



}
