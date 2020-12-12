import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveriesFillerComponent } from './deliveries-filler.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: DeliveriesFillerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./deliveries/deliveries.module').then(m => m.DeliveriesModule)
      },
      {
        path: 'single',
        loadChildren: () => import('./delivery/delivery.module').then(m => m.DeliveryModule)
      },
      {
        path: 'status',
        loadChildren: () => import('./delivery-status/delivery-status.module').then(m => m.DeliveryStatusModule)
      },
      {
        path: 'progress',
        loadChildren: () => import('./delivery-progress/delivery-progress.module').then(m => m.DeliveryProgressModule)
      },
      {
        path: 'employee',
         loadChildren: () => import('./delivery-employee/delivery-employee.module').then(m => m.DeliveryEmployeeModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveriesFillerRoutingModule { }
