import { Component, OnInit } from '@angular/core';
import { CouponService } from '../../services/coupon.service';

@Component({
  selector: 'app-coupons-history',
  templateUrl: './coupons-history.component.html',
  styleUrls: ['./coupons-history.component.scss']
})
export class CouponsHistoryComponent implements OnInit {
  redemptions: any[] = [];
  errorMessage = '';

  // Control del modal
  showDetailModal = false;
  selectedRedemption: any = null;

  constructor(private couponService: CouponService) {}

  ngOnInit(): void {
    this.loadRedemptions();
  }
  

  // Carga el historial de cupones
  loadRedemptions() {
    this.couponService.getMyRedemptions().subscribe({
      next: (res: any) => {
        this.redemptions = res;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al obtener historial';
      }
    });
  }

  // En lugar de pedir de nuevo el cupón, guardamos directamente la redención
  // en selectedRedemption y abrimos modal
  viewCouponDetail(redemption: any) {
    console.log(redemption)
    // Podrías volver a cargar detalles de la redención si es necesario:
    // this.couponService.getRedemptionDetail(redemption.id) ...
    // pero si la info de "qrCodeImage" ya viene en `redemption`, no es necesario
    this.selectedRedemption = redemption;
    this.showDetailModal = true;
  }

  // Cierra el modal
  closeDetailModal() {
    this.showDetailModal = false;
    this.selectedRedemption = null;
  }
}
