import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-purchase-registration',
  templateUrl: './purchase-registration.component.html',
  styleUrls: ['./purchase-registration.component.scss']
})
export class PurchaseRegistrationComponent implements OnInit {
  dni: string = '';
  amountInEuros: number = 0;
  purchaseDate: string = '';
  invoiceNumber: string = '';
  observation: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  private apiUrl = environment.API_URL + '/purchases';

  // Control para mostrar/ocultar el escáner
  showScanner: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onRegisterPurchase() {
    this.http.post(this.apiUrl, {
      dni: this.dni,
      amountInEuros: this.amountInEuros,
      purchaseDate: this.purchaseDate,
      invoiceNumber: this.invoiceNumber,
      observation: this.observation
    }).subscribe({
      next: (res: any) => {
        this.successMessage = res.message;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al registrar compra';
      }
    });
  }

  // Muestra / oculta el escáner
  toggleScanner() {
    this.showScanner = !this.showScanner;
    // Al activarlo, se muestra el <zxing-scanner> en el HTML
  }

  // Maneja el resultado cuando se escanea con éxito
  handleQrSuccess(scannedValue: string) {
    // scannedValue debería ser algo como "12345678-user@correo.com"
    const splitted = scannedValue.split('-');
    if (splitted.length > 1) {
      this.dni = splitted[0]; // splitted[1] sería el email
      // ocultar escáner si deseas
      this.showScanner = false;
    } else {
      alert('El código QR no tiene el formato DNI-Email');
    }
  }
}
