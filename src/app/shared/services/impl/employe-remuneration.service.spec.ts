import { TestBed } from '@angular/core/testing';

import { EmployeRemunerationService } from './employe-remuneration.service';

describe('EmployeRemunerationService', () => {
  let service: EmployeRemunerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeRemunerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
