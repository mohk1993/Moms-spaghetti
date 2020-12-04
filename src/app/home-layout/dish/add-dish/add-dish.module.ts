import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationDialogModule } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.module';
import { DeleteDialogModule } from 'src/app/dialogs/delete-dialog/delete-dialog.module';

import { AddDishRoutingModule } from './add-dish-routing.component';
import { AddDishComponent } from './add-dish.component';

@NgModule({
  declarations: [
    AddDishComponent
  ],
  imports: [
    AddDishRoutingModule,
    CommonModule,
    FormsModule,
    //dialogs
    DeleteDialogModule,
    ConfirmationDialogModule,
  ]
})
export class AddDishModule { }
