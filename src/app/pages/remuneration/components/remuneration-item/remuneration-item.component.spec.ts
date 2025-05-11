import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemunerationItemComponent } from './remuneration-item.component';

describe('RemunerationItemComponent', () => {
  let component: RemunerationItemComponent;
  let fixture: ComponentFixture<RemunerationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemunerationItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemunerationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
