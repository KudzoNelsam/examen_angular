import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { IBulletinService } from '../IBulletinService';
import { Observable } from 'rxjs';
import { RequestResponse } from '../../models/request.response.model';

@Injectable({
  providedIn: 'root'
})
export class BulletinService extends GenericService implements IBulletinService {

  constructor(http: HttpClient) {
    super(http);
    this.endPoint = "bulletins";
    this.baseUrl = `${this.apiUrl}/${this.endPoint}`;
    this.size = 10;
  }
  filter(champ?: string, page: number = this.page, size: number = this.size): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${this.baseUrl}?size=${size}&page=${page}${champ ? '&champ=' + champ : ''}`);
  }

  download(bulletinId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${bulletinId}/pdf`, { responseType: 'blob' });
  }
  
  downloadAll(periode: number, departementId? : number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/pdf?periodeId=${periode}${departementId ? '&departementId=' + departementId : ''}`, { responseType: 'blob' });
  }

  sendMail(bulletinId: number): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${this.baseUrl}/${bulletinId}/mail`);
  }
  sendAllMail(periode: number, departementId? : number): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${this.baseUrl}/mail?periodeId=${periode}${departementId ? '&departementId=' + departementId : ''}`);
  }

}
