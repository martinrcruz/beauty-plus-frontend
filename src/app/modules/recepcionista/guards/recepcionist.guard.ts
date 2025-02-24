import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReceptionistGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Aquí asumimos que guardas el rol en localStorage o algo similar
    // o retornas la info en el login. Ajusta según tu implementación.
    const token = this.authService.getToken();
    // Se puede decodificar el token para verificar el rol,
    // o guardarlo en un AuthService. Simplificado:
    if(this.authService.isValidToken()) {
      const userRole = this.getRoleFromToken(token); // Implementa parse JWT
      if (userRole === 'receptionist' || userRole === 'admin') {
        return true;
      }
    }
   
    this.router.navigate(['/auth/login']);
    return false;
  }

  getRoleFromToken(token: string | null): string | null {
    if (!token) return null;
    // Decodificar (en producción, usar librería jwt-decode).
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    } catch {
      return null;
    }
  }
}
