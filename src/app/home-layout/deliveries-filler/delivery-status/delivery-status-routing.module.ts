import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryStatusComponent } from './delivery-status.component';


const routes: Routes = [
  {
    path: '**',
    pathMatch: 'full',
    component: DeliveryStatusComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryStatusRoutingModule { }
