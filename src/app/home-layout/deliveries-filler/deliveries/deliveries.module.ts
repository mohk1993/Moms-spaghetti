import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveriesRoutingModule } from './deliveries-routing.module';
import { DeliveriesComponent } from './deliveries.component';

@NgModule({
  declarations: [
    DeliveriesComponent
  ],
  imports: [
    DeliveriesRoutingModule,
    CommonModule,
  ]
})
export class DeliveriesModule { }
