import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeesFillerComponent } from './employees-filler.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: EmployeesFillerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule)
      },
      {
        path: 'create',
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
      },
      {
        path: 'single',
        loadChildren: () => import('./single-employee/single-employee.module').then(m => m.SingleSingleEmployeeModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesFillerRoutingModule { }
