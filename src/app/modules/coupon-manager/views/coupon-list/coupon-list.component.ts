import { Component, OnInit } from '@angular/core';
import { CouponService } from '../../services/coupon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html'
})
export class CouponListComponent implements OnInit {
  coupons: any[] = [];
  errorMessage: string = '';

  constructor(private couponService: CouponService) {}

  ngOnInit(): void {
    this.loadCoupons();
  }

  loadCoupons() {
    this.couponService.getAllCoupons().subscribe({
      next: (res: any) => {
        this.coupons = res;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al obtener cupones';
      }
    });
  }

  onRedeem(couponId: number) {
    this.couponService.redeemCoupon(couponId).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Cupón canjeado',
          text: 'El cupón ha sido canjeado exitosamente.',
        })
        this.loadCoupons();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al canjear cupón',
          text: err.error?.message || 'Error al canjear cupón',
        })
      }
    });
  }
}
