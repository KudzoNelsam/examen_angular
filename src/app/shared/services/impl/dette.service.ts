import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericService } from './generic.service';

import { HttpClient } from '@angular/common/http';
import {IDetteService} from '../IDetteService';
import {RequestResponse} from '../../models/request.response.model';

@Injectable({
  providedIn: 'root'
})
export class DetteService extends GenericService implements IDetteService {
  protected override endPoint = 'dettes';

  constructor(protected override http: HttpClient) {
    super(http);
    this.baseUrl = `${this.apiUrl}/${this.endPoint}`;
  }

  getByClientId(clientId: string, page?: number, size?: number): Observable<RequestResponse> {
    const currentPage = page !== undefined ? page : this.page;
    const currentSize = size !== undefined ? size : this.size;
    return this.get(`?clientId=${clientId}&_page=${currentPage + 1}&_limit=${currentSize}`);
  }

  getDettesSoldees(page?: number, size?: number): Observable<RequestResponse> {
    const currentPage = page !== undefined ? page : this.page;
    const currentSize = size !== undefined ? size : this.size;
    return this.get(`?montantRestant=0&_page=${currentPage + 1}&_limit=${currentSize}`);
  }

  getDettesNonSoldees(page?: number, size?: number): Observable<RequestResponse> {
    const currentPage = page !== undefined ? page : this.page;
    const currentSize = size !== undefined ? size : this.size;
    return this.get(`?montantRestant_gt=0&_page=${currentPage + 1}&_limit=${currentSize}`);
  }

  updateMontants(id: string, montantDette: number, montantPaye: number): Observable<RequestResponse> {
    const montantRestant = montantDette - montantPaye;
    return this.http.patch<RequestResponse>(`${this.baseUrl}/${id}`, {
      montantDette,
      montantPaye,
      montantRestant
    });
  }

  getByDateRange(dateDebut: string, dateFin: string, page?: number, size?: number): Observable<RequestResponse> {
    const currentPage = page !== undefined ? page : this.page;
    const currentSize = size !== undefined ? size : this.size;
    return this.get(`?date_gte=${dateDebut}&date_lte=${dateFin}&_page=${currentPage + 1}&_limit=${currentSize}`);
  }

  getDetteWithDetails(detteId: string): Observable<RequestResponse> {
    return this.get(`${detteId}?_embed=lignes&_embed=paiements&_expand=client`);
  }

  getAllDettesByClient(clientId: string): Observable<RequestResponse> {
    return this.get(`?clientId=${clientId}`);
  }
}
