import { Injectable } from '@angular/core';
import { ILayoutService } from '../ILayoutService';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RequestResponse } from '../../models/request.response.model';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LayoutService implements ILayoutService {

  constructor(private http : HttpClient) { }
  getPeriode(): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${environment.apiUrl}/periodes/actuel`);
  }
}
