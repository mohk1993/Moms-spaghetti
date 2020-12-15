import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';

@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    OrderRoutingModule,
    CommonModule,
    FormsModule
  ]
})
export class OrderModule { }
