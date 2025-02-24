// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  // Rutas protegidas con layout
  {
    path: '',
    component: MainLayoutComponent, // Aplica el layout
    children: [
      {
        path: 'cliente',
        loadChildren: () => import('./modules/cliente/cliente.module').then(m => m.ClienteModule)
      },
      {
        path: 'receptionist',
        loadChildren: () => import('./modules/recepcionista/recepcionista.module').then(m => m.RecepcionistaModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./modules/administrador/administrador.module').then(m => m.AdministradorModule)
      },
      { path: '', redirectTo: 'cliente', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
