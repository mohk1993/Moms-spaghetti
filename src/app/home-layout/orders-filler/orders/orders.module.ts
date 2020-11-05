import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CancellationDialogModule } from 'src/app/dialogs/cancellation-dialog/cancellation-dialog.module';
import { ConfirmationDialogModule } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.module';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';

@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    OrdersRoutingModule,
    CommonModule,
    
    CancellationDialogModule,
    ConfirmationDialogModule,
  ]
})
export class OrdersModule { }
