import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  async canActivate(): Promise<boolean> {
    const user = await this.authService.getCurrentUser();

    if (user && user.role === 'admin') {
      return true; // ✅ Permitir acceso
    }

    console.log('⛔ Acceso denegado. Redirigiendo al login...');
    this.router.navigate(['/login']); // 🔥 Redirigir a login si no es admin
    return false;
  }
}
