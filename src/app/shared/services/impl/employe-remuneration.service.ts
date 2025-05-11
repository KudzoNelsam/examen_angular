import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { IEmployeRemunerationService } from '../IEmployeRemunerationService';
import { Observable } from 'rxjs';
import { EmployeRemuneration } from '../../models/employe.remuneration.model';
import { RequestResponse } from '../../models/request.response.model';
import { HttpClient } from '@angular/common/http';
import { EmployeRemunerationRequest } from '../../models/requests/employe.remuneration.model';
import { EmployeRemunerationUpdateRequest } from '../../models/requests/employe.remuneration.update.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeRemunerationService extends GenericService implements IEmployeRemunerationService {

  constructor(http : HttpClient) { 
    super(http);
    this.endPoint = "addRenumeration";
    this.baseUrl = `${this.apiUrl}/${this.endPoint}`;
  }
  updateRemuneration(remunerationId : number, remuneration: EmployeRemunerationUpdateRequest): Observable<RequestResponse> {
    return this.http.patch<RequestResponse>(`${this.baseUrl}/$remunerationId}`, remuneration);
  }
  addToEmploye(remuneration: EmployeRemuneration): Observable<RequestResponse> {
    return this.http.post<RequestResponse>(`${this.baseUrl}`, remuneration);
  }
}
