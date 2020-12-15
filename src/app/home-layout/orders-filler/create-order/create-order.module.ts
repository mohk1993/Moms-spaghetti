import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CreateOrderRoutingModule } from './create-order-routing.module';
import { CreateOrderComponent } from './create-order.component';

@NgModule({
  declarations: [
    CreateOrderComponent
  ],
  imports: [
    CreateOrderRoutingModule,
    CommonModule,
    FormsModule
  ]
})
export class CreateOrderModule { }
