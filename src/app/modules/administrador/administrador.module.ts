import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdministradorRoutingModule } from './administrador-routing.module';

import { CouponManagementComponent } from './views/coupon-management/coupon-management.component';
import { CouponFormComponent } from './views/coupon-form/coupon-form.component';
import { UserManagementComponent } from './views/user-management/user-management.component';
import { DashboardAdminComponent } from './views/dashboard-admin/dashboard-admin.component';

@NgModule({
  declarations: [
    CouponManagementComponent,
    CouponFormComponent,
    UserManagementComponent,
    DashboardAdminComponent  // Se agrega aquí
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdministradorRoutingModule
  ]
})
export class AdministradorModule {}
