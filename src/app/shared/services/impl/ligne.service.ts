import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { ILigneService } from '../ILigneService';
import { RequestResponse } from '../../models/request.response.model';

@Injectable({
  providedIn: 'root'
})
export class LigneService extends GenericService implements ILigneService {
  protected override endPoint = 'lignes';

  constructor(protected override http: HttpClient) {
    super(http);
    this.baseUrl = `${this.apiUrl}/${this.endPoint}`;
  }

  getByDetteId(detteId: string, page?: number, size?: number): Observable<RequestResponse> {
    const currentPage = page !== undefined ? page : this.page;
    const currentSize = size !== undefined ? size : this.size;
    return this.get(`?detteId=${detteId}&_page=${currentPage + 1}&_limit=${currentSize}`);
  }

  getByArticleId(articleId: string, page?: number, size?: number): Observable<RequestResponse> {
    const currentPage = page !== undefined ? page : this.page;
    const currentSize = size !== undefined ? size : this.size;
    return this.get(`?articleId=${articleId}&_page=${currentPage + 1}&_limit=${currentSize}`);
  }

  getAllByDetteId(detteId: string): Observable<RequestResponse> {
    return this.get(`?detteId=${detteId}&_expand=article`);
  }

  deleteByDetteId(detteId: string): Observable<RequestResponse> {
    return this.http.delete<RequestResponse>(`${this.baseUrl}?detteId=${detteId}`);
  }

  getLigneWithArticle(ligneId: string): Observable<RequestResponse> {
    return this.get(`${ligneId}?_expand=article`);
  }
}
