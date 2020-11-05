import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersFillerComponent } from './orders-filler.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: OrdersFillerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
      },
      {
        path: 'single',
        loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersFillerRoutingModule { }
