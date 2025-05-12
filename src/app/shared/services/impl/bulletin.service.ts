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
  }
  filter(champ?: string, page: number = 0, size: number = 12): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${this.baseUrl}?size=${size}&page=${page}${champ ? '&champ=' + champ : ''}`);
  }

  download(bulletinId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${bulletinId}/pdf`, { responseType: 'blob' });
  }

  sendMail(bulletinId: number): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${this.apiUrl}/mails/${bulletinId}/bulletin`);
  }

}
