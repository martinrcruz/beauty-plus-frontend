import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CouponUsageComponent } from './views/coupon-usage/coupon-usage.component';
import { PurchaseRegistrationComponent } from './views/purchase-registration/purchase-registration.component';
import { DashboardReceptionistComponent } from './views/dashboard-receptionist/dashboard-receptionist.component';
import { ReceptionistGuard } from './guards/recepcionist.guard';
import { ReceptionistProfileComponent } from './views/receptionist-profile/receptionist-profile.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [ReceptionistGuard],
    children: [
      { path: 'dashboard', component: DashboardReceptionistComponent },
      { path: 'purchase', component: PurchaseRegistrationComponent },
      { path: 'coupon-usage', component: CouponUsageComponent },
      { path: 'profile', component: ReceptionistProfileComponent },
      // Ruta por defecto -> 'dashboard'
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecepcionistaRoutingModule {}
