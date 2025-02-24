import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CouponManagerRoutingModule } from './coupon-manager-routing.module';
import { CouponListComponent } from './views/coupon-list/coupon-list.component';

// Vistas (componentes)

@NgModule({
  declarations: [
    CouponListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CouponManagerRoutingModule
  ]
})
export class CouponManagerModule { }
