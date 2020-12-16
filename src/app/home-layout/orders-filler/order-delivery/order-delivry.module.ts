import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { OrderDeliveryRoutingModule } from './order-delivery-routing.module';
import { OrderDeliveryComponent } from './order-delivery.component';

@NgModule({
  declarations: [
    OrderDeliveryComponent
  ],
  imports: [
    OrderDeliveryRoutingModule,
    CommonModule,
    FormsModule
  ]
})
export class OrderDeliveryModule { }
