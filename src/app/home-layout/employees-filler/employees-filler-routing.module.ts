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
        path: 'single',
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesFillerRoutingModule { }
