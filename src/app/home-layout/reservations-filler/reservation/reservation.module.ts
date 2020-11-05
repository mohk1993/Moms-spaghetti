import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CancellationDialogModule } from 'src/app/dialogs/cancellation-dialog/cancellation-dialog.module';
import { RateExperienceDialogModule } from 'src/app/dialogs/rate-experience-dialog/rate-experience-dialog.module';

import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationComponent } from './reservation.component';

@NgModule({
  declarations: [
    ReservationComponent
  ],
  imports: [
    ReservationRoutingModule,
    CommonModule,

    
    CancellationDialogModule,
    RateExperienceDialogModule
  ]
})
export class ReservationModule { }
