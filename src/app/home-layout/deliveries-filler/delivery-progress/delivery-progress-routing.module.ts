import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryProgressComponent } from './delivery-progress.component';


const routes: Routes = [
  {
    path: '**',
    pathMatch: 'full',
    component: DeliveryProgressComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryProgressRoutingModule { }
