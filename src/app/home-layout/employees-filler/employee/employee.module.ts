import { NgModule } from '@angular/core';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';

@NgModule({
  declarations: [
    EmployeeComponent
  ],
  imports: [
    EmployeeRoutingModule,
    
  ]
})
export class EmployeeModule { }
