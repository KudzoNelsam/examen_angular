import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletinItemComponent } from './bulletin-item.component';

describe('BulletinItemComponent', () => {
  let component: BulletinItemComponent;
  let fixture: ComponentFixture<BulletinItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulletinItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulletinItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
