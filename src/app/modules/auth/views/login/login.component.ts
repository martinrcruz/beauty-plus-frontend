import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        //TODO: reemplazar navegacion segun rol.
        console.log(res.user.role)
        if(res.user.role == "admin"){
          this.router.navigate(['/admin/dashboard']);
        } else if(res.user.role == "receptionist"){
          this.router.navigate(['/receptionist/dashboard']);
        } else {
          this.router.navigate(['/cliente/dashboard']);
        }
        // Redirige a la sección de cupones (o al home que consideres)
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al iniciar sesión';
      }
    });
  }
}
