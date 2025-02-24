import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardClientComponent } from './views/dashboard-client/dashboard-client.component';
import { CouponsHistoryComponent } from './views/coupons-history/coupons-history.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ProfileComponent } from './views/profile/profile.component';
import { CouponListComponent } from './views/coupon-list/coupon-list.component';
import { HowItWorksComponent } from './views/how-it-works/how-it-works.component';
import { AdvantagesComponent } from './views/advantages/advantages.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardClientComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'history', component: CouponsHistoryComponent },
      { path: 'coupons', component: CouponListComponent },
      { path: 'how-it-works', component: HowItWorksComponent },
      { path: 'advantages', component: AdvantagesComponent },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule {}
