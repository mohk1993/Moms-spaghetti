import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationsFillerComponent } from './reservations-filler.component';

import { ReservationsComponent } from './reservations/reservations.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: ReservationsFillerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./reservations/reservations.module').then(m => m.ReservationsModule)
      },
      {
        path: 'single',
        loadChildren: () => import('./reservation/reservation.module').then(m => m.ReservationModule)
      },
      {
        path: 'create',
        loadChildren: () => import('./reservation-form/reservation-form.module').then(m => m.ReservationFormModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationsFillerRoutingModule { }
