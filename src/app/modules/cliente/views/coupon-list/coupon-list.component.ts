import { Component, OnInit } from '@angular/core';
import { CouponService } from '../../services/coupon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.scss']
})
export class CouponListComponent implements OnInit {
  // Arreglo para los cupones destacados
  highlightedCoupons: any[] = [];
  highlightedError: string = '';

  // Arreglo para los cupones normales
  coupons: any[] = [];
  errorMessage: string = '';

  // Set para almacenar los couponIds que el usuario YA canjeó
  redeemedCouponIds = new Set<number>();

  constructor(private couponService: CouponService) {}

  ngOnInit(): void {
    // 1) Cargar redenciones del usuario
    this.loadRedemptions();
  }

  // Carga el historial de redenciones (cupones ya canjeados)
  loadRedemptions() {
    this.couponService.getMyRedemptions().subscribe({
      next: (redemptions: any) => {
        // Guardar en redeemedCouponIds todos los cupones canjeados
        redemptions.forEach((r: any) => {
          this.redeemedCouponIds.add(r.couponId);
        });
        // Luego cargar cupones (filtrando)
        this.loadHighlightedCoupons();
        this.loadCoupons();
      },
      error: (err) => {
        // Si ocurre error, aun así intentamos cargar cupones
        console.error('Error al obtener redenciones:', err);
        this.loadHighlightedCoupons();
        this.loadCoupons();
      }
    });
  }

  // Carga cupones DESTACADOS
  loadHighlightedCoupons() {
    this.couponService.getHighlightedCoupons().subscribe({
      next: (res: any) => {
        // Filtrar los que ya canjeó
        this.highlightedCoupons = res.filter((c: any) => 
          !this.redeemedCouponIds.has(c.id)
        );
      },
      error: (err) => {
        this.highlightedError = err.error?.message || 'Error al obtener cupones destacados';
      }
    });
  }

  // Carga cupones NORMALES
  loadCoupons() {
    this.couponService.getAllCoupons().subscribe({
      next: (res: any) => {
        // Filtrar los que ya canjeó
        this.coupons = res.filter((c: any) =>
          !this.redeemedCouponIds.has(c.id)
        );
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al obtener cupones';
      }
    });
  }

  // Redimir un cupón (puede usarse tanto en destacados como en normales)
  onRedeem(couponId: number, isHighlighted: boolean = false) {
    this.couponService.redeemCoupon(couponId).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Cupón canjeado',
          text: 'El cupón ha sido canjeado exitosamente.',
        })

        // Como el cupón ahora se ha canjeado, lo agregamos a redeemedCouponIds
        this.redeemedCouponIds.add(couponId);

        // Refiltrar la lista adecuada
        if (isHighlighted) {
          this.highlightedCoupons = this.highlightedCoupons.filter(
            (c: any) => c.id !== couponId
          );
        } else {
          this.coupons = this.coupons.filter(
            (c: any) => c.id !== couponId
          );
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al canjear cupón',
        })
      }
    });
  }
}
