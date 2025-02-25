import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  fullName = '';
  dni = '';
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  // El rol no se elige en el formulario => forzado a 'client'
  private readonly role = 'client'; 

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    const data = {
      fullName: this.fullName,
      dni: this.dni,
      email: this.email,
      password: this.password,
      role: this.role // se asigna 'client'
    };

    this.authService.register(data).subscribe({
      next: () => {
        this.successMessage = 'Registro exitoso. Ahora inicia sesión.';
        // Opcional: Podrías redirigir directamente al login:
        // this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al registrar usuario';
      }
    });
  }

  // Nueva función para ir a la pantalla de login
  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
