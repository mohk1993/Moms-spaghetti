import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderDeliveryComponent } from './order-delivery.component';


const routes: Routes = [
  {
    path: '**',
    pathMatch: 'full',
    component: OrderDeliveryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderDeliveryRoutingModule { }
