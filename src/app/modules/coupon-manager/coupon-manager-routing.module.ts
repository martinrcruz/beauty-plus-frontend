import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CouponListComponent } from './views/coupon-list/coupon-list.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    children: [
      // Ruta para listar los cupones
      { path: 'coupons', component: CouponListComponent },
      { path: '', redirectTo: 'coupons', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouponManagerRoutingModule {}
