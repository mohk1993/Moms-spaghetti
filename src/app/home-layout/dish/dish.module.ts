import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmationDialogModule } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.module';
import { DeleteDialogModule } from 'src/app/dialogs/delete-dialog/delete-dialog.module';

import { DishRoutingModule } from './dish-routing.component';
import { DishComponent } from './dish.component';

@NgModule({
  declarations: [
    DishComponent
  ],
  imports: [
    DishRoutingModule,
    CommonModule,

    //dialogs
    DeleteDialogModule,
    ConfirmationDialogModule,
  ]
})
export class DishModule { }
