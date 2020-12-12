import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryEmployeeComponent } from './delivery-employee.component';


const routes: Routes = [
  {
    path: '**',
    pathMatch: 'full',
    component: DeliveryEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryEmployeeRoutingModule { }
