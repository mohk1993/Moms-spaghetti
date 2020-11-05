import { NgModule } from '@angular/core';

import { ReservationsFillerRoutingModule } from './reservations-filler-routing.module';
import { ReservationsFillerComponent } from './reservations-filler.component';

@NgModule({
  declarations: [
    ReservationsFillerComponent
  ],
  imports: [
    ReservationsFillerRoutingModule,
    
  ]
})
export class ReservationsFillerModule { }
