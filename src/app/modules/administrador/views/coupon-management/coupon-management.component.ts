import { Component, OnInit } from '@angular/core';
import { AdminCouponService } from '../../services/admin-coupon.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coupon-management',
  templateUrl: './coupon-management.component.html',
  styleUrls: ['./coupon-management.component.scss']
})
export class CouponManagementComponent implements OnInit {
  coupons: any[] = [];
  errorMessage = '';

  constructor(private adminCouponService: AdminCouponService, private router: Router) {}

  ngOnInit(): void {
    this.loadCoupons();
  }

  loadCoupons() {
    this.adminCouponService.getAllCouponsAdmin().subscribe({
      next: (res: any) => {
        // res debe contener c.imageURL u otro campo donde guardaste la ruta de la imagen
        this.coupons = res;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al obtener cupones';
      }
    });
  }

  onEditCoupon(id: number) {
    this.router.navigate(['/admin/coupon-form', id]);
  }

  onDeleteCoupon(id: number) {
    if (confirm('¿Seguro de eliminar este cupón?')) {
      this.adminCouponService.deleteCoupon(id).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Cupon eliminado',
            showConfirmButton: false,
            timer: 1500
          })
          this.loadCoupons();
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al eliminar cupón',
            showConfirmButton: false,
            timer: 1500
          })
        }
      });
    }
  }

  onCreateCoupon() {
    this.router.navigate(['/admin/coupon-form']);
  }
}
