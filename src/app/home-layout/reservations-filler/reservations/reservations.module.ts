import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { ReservationsComponent } from './reservations.component';

@NgModule({
  declarations: [
    ReservationsComponent
  ],
  imports: [
    ReservationsRoutingModule,
    RouterModule
  ]
})
export class ReservationsModule { }
