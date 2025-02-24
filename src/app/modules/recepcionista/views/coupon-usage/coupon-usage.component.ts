// coupon-usage.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-coupon-usage',
  templateUrl: './coupon-usage.component.html',
  styleUrls: ['./coupon-usage.component.scss']
})
export class CouponUsageComponent {
  redemptionId!: number;
  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}

  onUseCoupon() {
    this.http.post('http://localhost:4000/api/coupons/use', {
      redemptionId: this.redemptionId
    }).subscribe({
      next: (res: any) => {
        this.successMessage = res.message;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al aplicar cupón';
      }
    });
  }
}
