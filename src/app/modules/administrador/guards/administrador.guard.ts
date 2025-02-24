import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdministradorGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    const token = this.authService.getToken();
    const userRole = this.getRoleFromToken(token);
    if (this.authService.isValidToken()) {

      if (userRole === 'admin') {
        return true;
      }
    }
    this.router.navigate(['/auth/login']);
    return false;
  }

  getRoleFromToken(token: string | null): string | null {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    } catch {
      return null;
    }
  }
}
