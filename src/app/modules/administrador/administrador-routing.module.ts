import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorGuard } from './guards/administrador.guard';

import { CouponManagementComponent } from './views/coupon-management/coupon-management.component';
import { CouponFormComponent } from './views/coupon-form/coupon-form.component';
import { UserManagementComponent } from './views/user-management/user-management.component';
import { DashboardAdminComponent } from './views/dashboard-admin/dashboard-admin.component';
import { CouponUsageComponent } from './views/coupon-usage/coupon-usage.component';
import { PurchaseRegistrationComponent } from './views/purchase-registration/purchase-registration.component';

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
      { path: 'coupon-usage', component: CouponUsageComponent },
      { path: 'purchase', component: PurchaseRegistrationComponent },

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
