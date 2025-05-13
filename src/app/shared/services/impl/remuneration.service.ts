import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { IRemunerationService } from '../IRemunerationService';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestResponse } from '../../models/request.response.model';

@Injectable({
  providedIn: 'root'
})
export class RemunerationService extends GenericService  implements IRemunerationService { 

  constructor(http : HttpClient) {
    super(http);
    this.endPoint = "remunerations";
    this.baseUrl = `${this.apiUrl}/${this.endPoint}`;
    this.size = 10;
  }
  getRemunerationsNonAssociees(id: number): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${this.baseUrl}/${id}/employe`);
  }
}
