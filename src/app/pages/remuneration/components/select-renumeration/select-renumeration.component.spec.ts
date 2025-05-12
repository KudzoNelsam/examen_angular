import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRenumerationComponent } from './select-renumeration.component';

describe('SelectRenumerationComponent', () => {
  let component: SelectRenumerationComponent;
  let fixture: ComponentFixture<SelectRenumerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectRenumerationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectRenumerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
