import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdministradorRoutingModule } from './administrador-routing.module';

import { CouponManagementComponent } from './views/coupon-management/coupon-management.component';
import { CouponFormComponent } from './views/coupon-form/coupon-form.component';
import { UserManagementComponent } from './views/user-management/user-management.component';
import { DashboardAdminComponent } from './views/dashboard-admin/dashboard-admin.component';
import { PurchaseRegistrationComponent } from './views/purchase-registration/purchase-registration.component';
import { CouponUsageComponent } from './views/coupon-usage/coupon-usage.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  declarations: [
    CouponManagementComponent,
    CouponFormComponent,
    UserManagementComponent,
    DashboardAdminComponent,
    PurchaseRegistrationComponent,
    CouponUsageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdministradorRoutingModule,
    ZXingScannerModule
  ]
})
export class AdministradorModule {}
