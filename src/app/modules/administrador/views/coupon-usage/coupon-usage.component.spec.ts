import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponUsageComponent } from './coupon-usage.component';

describe('CouponUsageComponent', () => {
  let component: CouponUsageComponent;
  let fixture: ComponentFixture<CouponUsageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CouponUsageComponent]
    });
    fixture = TestBed.createComponent(CouponUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
