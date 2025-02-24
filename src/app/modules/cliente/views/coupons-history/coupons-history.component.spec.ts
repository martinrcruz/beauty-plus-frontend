import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsHistoryComponent } from './coupons-history.component';

describe('CouponsHistoryComponent', () => {
  let component: CouponsHistoryComponent;
  let fixture: ComponentFixture<CouponsHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CouponsHistoryComponent]
    });
    fixture = TestBed.createComponent(CouponsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
