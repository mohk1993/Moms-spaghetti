import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationDialogModule } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.module';
import { DeleteDialogModule } from 'src/app/dialogs/delete-dialog/delete-dialog.module';

import { EditDishRoutingModule } from './edit-dish-routing.component';
import { EditDishComponent } from './edit-dish.component';

@NgModule({
  declarations: [
    EditDishComponent
  ],
  imports: [
    EditDishRoutingModule,
    CommonModule,
    FormsModule,
    //dialogs
    DeleteDialogModule,
    ConfirmationDialogModule,
  ]
})
export class EditDishModule { }
