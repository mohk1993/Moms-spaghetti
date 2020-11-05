import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmationDialogModule } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.module';

import { DeliveryStatusRoutingModule } from './delivery-status-routing.module';
import { DeliveryStatusComponent } from './delivery-status.component';

@NgModule({
  declarations: [
    DeliveryStatusComponent
  ],
  imports: [
    DeliveryStatusRoutingModule,
    CommonModule,

    ConfirmationDialogModule
  ]
})
export class DeliveryStatusModule { }
