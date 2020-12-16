import { Component } from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {

  reservationID: string;


  constructor() {
    // this.reservationID = param["reservation_id"];

    //   if(this.reservationID == null){
    //     this.router.navigate(["/"]);
    //   } else this.reservationService.getReservation(this.reservationID);
  }
}
