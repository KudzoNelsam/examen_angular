import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericService } from './generic.service';

import { HttpClient } from '@angular/common/http';
import {IClientService} from '../IClientService';
import {RequestResponse} from '../../models/request.response.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends GenericService implements IClientService {
  protected override endPoint = 'clients';

  constructor(protected override http: HttpClient) {
    super(http);
    this.baseUrl = `${this.apiUrl}/${this.endPoint}`;
  }

  search(query: string, page?: number, size?: number): Observable<RequestResponse> {
    const currentPage = page !== undefined ? page : this.page;
    const currentSize = size !== undefined ? size : this.size;
    return this.get(`?q=${query}&_page=${currentPage + 1}&_limit=${currentSize}`);
  }

  getByTelephone(telephone: string): Observable<RequestResponse> {
    return this.get(`?telephone=${telephone}`);
  }

  getClientWithDettes(clientId: string): Observable<RequestResponse> {
    return this.get(`${clientId}?_embed=dettes`);
  }
}
