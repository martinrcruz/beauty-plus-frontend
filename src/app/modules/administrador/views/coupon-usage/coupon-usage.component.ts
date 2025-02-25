import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-coupon-usage',
  templateUrl: './coupon-usage.component.html',
  styleUrls: ['./coupon-usage.component.scss']
})
export class CouponUsageComponent {
  redemptionId: string = ''; // Convertirlo a string si deseas almacenar el QR tal cual
  successMessage = '';
  errorMessage = '';
  showScanner = false; // Control para mostrar/ocultar el escáner

  private apiUrl = environment.API_URL + '/coupons';

  constructor(private http: HttpClient) {}

  onUseCoupon() {
    // Si en el backend redemptionId es numérico, parsea:
    const redemptionIdNumber = parseInt(this.redemptionId, 10);

    this.http.post(this.apiUrl + '/use', {
      redemptionId: redemptionIdNumber // O redemptionId: this.redemptionId si tu backend maneja string
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

  // Muestra/oculta el escáner
  toggleScanner() {
    this.showScanner = !this.showScanner;
  }

  // Maneja el resultado al escanear con éxito
  handleQrSuccess(scannedValue: string) {
    // scannedValue = "algunCodigo" (podría ser numérico o alfanumérico)
    this.redemptionId = scannedValue;
    // Ocultamos el escáner si deseas
    this.showScanner = false;
  }
}
