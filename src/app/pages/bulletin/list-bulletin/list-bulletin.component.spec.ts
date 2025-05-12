import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBulletinComponent } from './list-bulletin.component';

describe('ListBulletinComponent', () => {
  let component: ListBulletinComponent;
  let fixture: ComponentFixture<ListBulletinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBulletinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBulletinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
