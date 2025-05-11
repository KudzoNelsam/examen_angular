import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { IRemunerationService } from '../RemunerationService';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RemunerationService extends GenericService  implements IRemunerationService { 

  constructor(http : HttpClient) {
    super(http);
    this.endPoint = "remunerations";
    this.baseUrl = `${this.apiUrl}/${this.endPoint}`;
  }
}
