import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private apiUrl = environment.API_URL + '/coupons';


  constructor(private http: HttpClient) { }

  getAllCoupons() {
    return this.http.get(this.apiUrl);
  }

  redeemCoupon(couponId: number) {
    return this.http.post(`${this.apiUrl}/redeem`, { couponId });
  }
}
