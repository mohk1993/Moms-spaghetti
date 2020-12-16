import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ReservationFormRoutingModule } from './reservation-form-routing.module';
import { ReservationFormComponent } from './reservation-form.component';

@NgModule({
  declarations: [
    ReservationFormComponent
  ],
  imports: [
    ReservationFormRoutingModule,
    CommonModule,
    FormsModule
  ]
})
export class ReservationFormModule { }
