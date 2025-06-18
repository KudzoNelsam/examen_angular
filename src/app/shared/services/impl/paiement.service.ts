import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericService } from './generic.service';

import { HttpClient } from '@angular/common/http';
import {IPaiementService} from '../IPaiementService';
import {RequestResponse} from '../../models/request.response.model';

@Injectable({
  providedIn: 'root'
})
export class PaiementService extends GenericService implements IPaiementService {
  protected override endPoint = 'paiements';

  constructor(protected override http: HttpClient) {
    super(http);
    this.baseUrl = `${this.apiUrl}/${this.endPoint}`;
  }

  getByDetteId(detteId: string, page?: number, size?: number): Observable<RequestResponse> {
    const currentPage = page !== undefined ? page : this.page;
    const currentSize = size !== undefined ? size : this.size;
    return this.get(`?detteId=${detteId}&_page=${currentPage + 1}&_limit=${currentSize}`);
  }

  getByClientId(clientId: string, page?: number, size?: number): Observable<RequestResponse> {
    const currentPage = page !== undefined ? page : this.page;
    const currentSize = size !== undefined ? size : this.size;
    return this.get(`?clientId=${clientId}&_page=${currentPage + 1}&_limit=${currentSize}`);
  }

  getAllByDetteId(detteId: string): Observable<RequestResponse> {
    return this.get(`?detteId=${detteId}`);
  }

  getAllByClientId(clientId: string): Observable<RequestResponse> {
    return this.get(`?clientId=${clientId}`);
  }

  getByDateRange(dateDebut: string, dateFin: string, page?: number, size?: number): Observable<RequestResponse> {
    const currentPage = page !== undefined ? page : this.page;
    const currentSize = size !== undefined ? size : this.size;
    return this.get(`?date_gte=${dateDebut}&date_lte=${dateFin}&_page=${currentPage + 1}&_limit=${currentSize}`);
  }

  getTotalByDette(detteId: string): Observable<RequestResponse> {
    return this.get(`total?detteId=${detteId}`);
  }

  getTotalByClient(clientId: string): Observable<RequestResponse> {
    return this.get(`total?clientId=${clientId}`);
  }

  getTotalPaiementsToday(): Observable<RequestResponse> {
    const today = new Date().toISOString().split('T')[0];
    return this.get(`total?date=${today}`);
  }
}
