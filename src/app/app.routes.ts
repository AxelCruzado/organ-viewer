import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { OrganosComponent } from './pages/organos/organos.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [  // 🔹 Agregar "export"
  { path: '', component: HomeComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'organos', component: OrganosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
