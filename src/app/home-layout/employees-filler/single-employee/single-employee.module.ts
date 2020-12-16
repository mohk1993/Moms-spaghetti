import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SingleEmployeeRoutingModule } from './single-employee-routing.module';
import { SingleEmployeeComponent } from './single-employee.component';

@NgModule({
  declarations: [
    SingleEmployeeComponent
  ],
  imports: [
    SingleEmployeeRoutingModule,
    CommonModule,
    FormsModule
    
  ]
})
export class SingleSingleEmployeeModule { }
