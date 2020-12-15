import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CancellationDialogModule } from 'src/app/dialogs/cancellation-dialog/cancellation-dialog.module';

import { DeliveryEmployeeRoutingModule } from './delivery-employee-routing.module';
import { DeliveryEmployeeComponent } from './delivery-employee.component';

@NgModule({
  declarations: [
    DeliveryEmployeeComponent
  ],
  imports: [
    DeliveryEmployeeRoutingModule,
    CommonModule,
    FormsModule,

    CancellationDialogModule
  ]
})
export class DeliveryEmployeeModule { }
