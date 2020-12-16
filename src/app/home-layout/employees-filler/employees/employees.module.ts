import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';

@NgModule({
  declarations: [
    EmployeesComponent
  ],
  imports: [
    EmployeesRoutingModule,
    CommonModule
  ]
})
export class EmployeesModule { }
