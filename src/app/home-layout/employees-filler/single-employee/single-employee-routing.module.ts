import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleEmployeeComponent } from './single-employee.component';


const routes: Routes = [
  {
    path: '**',
    pathMatch: 'full',
    component: SingleEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingleEmployeeRoutingModule { }
