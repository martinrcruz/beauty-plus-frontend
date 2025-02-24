import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-purchase-registration',
  templateUrl: './purchase-registration.component.html'
})
export class PurchaseRegistrationComponent {
  dni: string = '';
  amountInEuros: number = 0;
  purchaseDate: string = ''; // Formato 'YYYY-MM-DD'
  invoiceNumber: string = '';
  observation: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  onRegisterPurchase() {
    this.http.post('http://localhost:4000/api/purchases', {
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
}
