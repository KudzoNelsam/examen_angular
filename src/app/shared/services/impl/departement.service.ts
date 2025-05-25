import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { IDepartementService } from '../IDepartementService';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartementService extends GenericService implements IDepartementService {

  constructor(http: HttpClient) {
    super(http);
    this.endPoint = 'departements';
    this.baseUrl = `${this.apiUrl}/${this.endPoint}`;
    this.size = 10;

  }
}
