import { NgModule } from '@angular/core';

import { OrdersFillerRoutingModule } from './orders-filler-routing.module';
import { OrdersFillerComponent } from './orders-filler.component';

@NgModule({
  declarations: [
    OrdersFillerComponent
  ],
  imports: [
    OrdersFillerRoutingModule,
    
  ]
})
export class OrdersFillerModule { }
