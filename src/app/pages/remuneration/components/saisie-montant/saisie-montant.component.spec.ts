import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaisieMontantComponent } from './saisie-montant.component';

describe('SaisieMontantComponent', () => {
  let component: SaisieMontantComponent;
  let fixture: ComponentFixture<SaisieMontantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaisieMontantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaisieMontantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
