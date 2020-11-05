import { NgModule } from '@angular/core';

import { ReservationFormRoutingModule } from './reservation-form-routing.module';
import { ReservationFormComponent } from './reservation-form.component';

@NgModule({
  declarations: [
    ReservationFormComponent
  ],
  imports: [
    ReservationFormRoutingModule,
    
  ]
})
export class ReservationFormModule { }
