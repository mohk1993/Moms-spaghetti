import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmationDialogModule } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.module';
import { DeleteDialogModule } from 'src/app/dialogs/delete-dialog/delete-dialog.module';

import { PopularDishRoutingModule } from './popular-dish-routing.component';
import { PopularDishComponent } from './popular-dish.component';

@NgModule({
  declarations: [
    PopularDishComponent
  ],
  imports: [
    PopularDishRoutingModule,
    CommonModule,

    //dialogs
    DeleteDialogModule,
    ConfirmationDialogModule,
  ]
})
export class PopularDishModule { }
