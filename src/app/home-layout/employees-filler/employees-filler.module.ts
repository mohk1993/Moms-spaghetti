import { NgModule } from '@angular/core';

import { EmployeesFillerRoutingModule } from './employees-filler-routing.module';
import { EmployeesFillerComponent } from './employees-filler.component';

@NgModule({
  declarations: [
    EmployeesFillerComponent
  ],
  imports: [
    EmployeesFillerRoutingModule,
    
  ]
})
export class EmployeesFillerModule { }
