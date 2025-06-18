import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GenericService } from './generic.service';

import { HttpClient } from '@angular/common/http';
import {IArticleService} from '../IArticleService';
import {RequestResponse} from '../../models/request.response.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends GenericService implements IArticleService {
  protected override endPoint = 'articles';

  constructor(protected override http: HttpClient) {
    super(http);
    this.baseUrl = `${this.apiUrl}/${this.endPoint}`;
  }

  updateStock(id: string, qteStock: number): Observable<RequestResponse> {
    return this.http.patch<RequestResponse>(`${this.baseUrl}/${id}`, { qteStock });
  }

  searchByLibelle(libelle: string, page?: number, size?: number): Observable<RequestResponse> {
    const currentPage = page !== undefined ? page : this.page;
    const currentSize = size !== undefined ? size : this.size;
    return this.get(`?libelle_like=${libelle}&_page=${currentPage + 1}&_limit=${currentSize}`);
  }

  getAvailableArticles(page?: number, size?: number): Observable<RequestResponse> {
    const currentPage = page !== undefined ? page : this.page;
    const currentSize = size !== undefined ? size : this.size;
    return this.get(`?qteStock_gte=1&_page=${currentPage + 1}&_limit=${currentSize}`);
  }

  getByLibelle(libelle: string): Observable<RequestResponse> {
    return this.get(`?libelle=${libelle}`);
  }

  decrementStock(id: string, quantity: number): Observable<RequestResponse> {
    return this.getById(id).pipe(
      switchMap(response => {
        if (response.results) {
          const newStock = response.results.qteStock - quantity;
          return this.updateStock(id, newStock);
        }
        throw new Error('Article non trouvé');
      })
    );
  }
}
