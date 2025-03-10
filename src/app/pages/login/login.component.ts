import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // 🔥 Importar servicio de autenticación
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  async onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }
  
    try {
      const { email, role } = await this.authService.login(this.email, this.password);
      console.log(`✅ Usuario logueado: ${email} | Rol: ${role}`);
  
      if (role === 'admin') {
        console.log('🚀 Redirigiendo al panel de administrador...');
        // 🔥 Mostrar modal de error
        Swal.fire({
            icon: 'success',
            title: 'Acceso aprobado',
            text: 'Bienvenido al panel administrativo.',
            confirmButtonColor: '#d33'
          });
        this.router.navigate(['/dashboard']); // 🔥 Redirige al dashboard
      } else {
        console.log('⛔ No tienes acceso al panel administrativo.');
  
        // 🔥 Mostrar modal de error
        Swal.fire({
          icon: 'error',
          title: 'Acceso denegado',
          text: 'No tienes acceso al panel administrativo.',
          confirmButtonColor: '#d33'
        });
        this.router.navigate(['/home']); // 🔥 Redirige al dashboard
      }
    } catch (error) {
      this.errorMessage = 'Error en el inicio de sesión.';
    }
  }
  
  
}
