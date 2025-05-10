import { Injectable } from '@angular/core';
import { IEmployeService } from '../IEmployeService';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeService extends GenericService implements IEmployeService{

  constructor(http: HttpClient) {
    super(http);
    this.endPoint = "employes";
    this.baseUrl = `${this.apiUrl}/${this.endPoint}`;
  }
  
}
