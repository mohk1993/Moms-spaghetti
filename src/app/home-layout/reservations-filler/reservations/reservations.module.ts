import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { ReservationsComponent } from './reservations.component';

@NgModule({
  declarations: [
    ReservationsComponent
  ],
  imports: [
    ReservationsRoutingModule,
    RouterModule,

    CommonModule,
    FormsModule
  ]
})
export class ReservationsModule { }
