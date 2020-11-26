import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';

@NgModule({
  declarations: [
    EmployeeComponent
  ],
  imports: [
    EmployeeRoutingModule,
    CommonModule,
    FormsModule
    
  ]
})
export class EmployeeModule { }
