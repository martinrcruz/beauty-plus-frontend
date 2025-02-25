import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecepcionistaRoutingModule } from './recepcionista-routing.module';

import { PurchaseRegistrationComponent } from './views/purchase-registration/purchase-registration.component';
import { CouponUsageComponent } from './views/coupon-usage/coupon-usage.component';
import { DashboardReceptionistComponent } from './views/dashboard-receptionist/dashboard-receptionist.component';
import { ReceptionistProfileComponent } from './views/receptionist-profile/receptionist-profile.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  declarations: [
    PurchaseRegistrationComponent,
    CouponUsageComponent,
    DashboardReceptionistComponent,
    ReceptionistProfileComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    RecepcionistaRoutingModule,
    ZXingScannerModule
  ]
})
export class RecepcionistaModule {}
