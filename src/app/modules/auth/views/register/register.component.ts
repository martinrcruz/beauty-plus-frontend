import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  fullName = '';
  dni = '';
  email = '';
  password = '';
  role = 'client'; // Por defecto
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    const data = {
      fullName: this.fullName,
      dni: this.dni,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.authService.register(data).subscribe({
      next: () => {
        this.successMessage = 'Registro exitoso. Inicia sesión a continuación.';
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al registrar usuario';
      }
    });
  }
}
