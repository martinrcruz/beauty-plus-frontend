import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminCouponService {
  private apiUrl = environment.API_URL + '/coupons';

  constructor(private http: HttpClient) {}

  getCouponById(id: number) {
    return this.http.get(`${this.apiUrl}/coupon-detail/${id}`);
  }

    // Crea cupón con FormData
    createCouponFormData(formData: FormData) {
      return this.http.post(`${this.apiUrl}`, formData);
    }
  
    // Actualiza cupón con FormData
    updateCouponFormData(id: number, formData: FormData) {
      return this.http.put(`${this.apiUrl}/${id}`, formData);
    }
  

  // Todos los cupones, incluyendo inactivos
  getAllCouponsAdmin() {
    return this.http.get(`${this.apiUrl}/admin-all`);
  }

  createCoupon(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  updateCoupon(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteCoupon(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
