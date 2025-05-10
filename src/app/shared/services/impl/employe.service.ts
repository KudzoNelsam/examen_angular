import { Injectable } from '@angular/core';
import { IEmployeService } from '../IEmployeService';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestResponse } from '../../models/request.response.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeService extends GenericService implements IEmployeService{

  constructor(http: HttpClient) {
    super(http);
    this.endPoint = "employes";
    this.baseUrl = `${this.apiUrl}/${this.endPoint}`;
  }
  filter(champ?: string, statut?: string, departementId?: number, page: number =0, size: number =12): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${this.baseUrl}?size=${size}&page=${page}${champ?'&champ='+champ:''}${statut?'&statut='+statut:''}${departementId?'&departementId='+departementId:''}`);
  }
  
}
