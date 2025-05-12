import { Injectable } from '@angular/core';
import { IPeriodeService } from '../IPeriodeService';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RequestResponse } from '../../models/request.response.model';
import { environment } from '../../../../environments/environment.development';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class PeriodeService extends GenericService implements IPeriodeService {

  constructor(http : HttpClient) {
    super(http);
    this.endPoint = "periodes";
    this.baseUrl = `${this.apiUrl}/${this.endPoint}`;
  }
  getActualPeriode(): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${environment.apiUrl}/periodes/actuel`);
  }
}
