import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteRoutingModule } from './cliente-routing.module';

// Vistas
import { DashboardClientComponent } from './views/dashboard-client/dashboard-client.component';
import { ProfileComponent } from './views/profile/profile.component';
import { CouponsHistoryComponent } from './views/coupons-history/coupons-history.component';
import { CouponListComponent } from './views/coupon-list/coupon-list.component';
import { HowItWorksComponent } from './views/how-it-works/how-it-works.component';
import { AdvantagesComponent } from './views/advantages/advantages.component';

@NgModule({
  declarations: [
    DashboardClientComponent,
    ProfileComponent,
    CouponsHistoryComponent,
    CouponListComponent,
    HowItWorksComponent,
    AdvantagesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClienteRoutingModule
  ]
})
export class ClienteModule {}
