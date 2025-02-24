import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorGuard } from './guards/administrador.guard';

import { CouponManagementComponent } from './views/coupon-management/coupon-management.component';
import { CouponFormComponent } from './views/coupon-form/coupon-form.component';
import { UserManagementComponent } from './views/user-management/user-management.component';
import { DashboardAdminComponent } from './views/dashboard-admin/dashboard-admin.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdministradorGuard],
    children: [
      { path: 'dashboard', component: DashboardAdminComponent },
      { path: 'coupons', component: CouponManagementComponent },
      { path: 'coupon-form', component: CouponFormComponent },
      { path: 'coupon-form/:id', component: CouponFormComponent },
      { path: 'users', component: UserManagementComponent },
      // Ruta por defecto -> 'dashboard'
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule {}
