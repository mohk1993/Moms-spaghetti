import { Component } from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {

  constructor() {}

  cancellation_dialog: boolean = false;
  experience_dialog: boolean = false;

  openCancellation() { this.cancellation_dialog = true; }
  closeCancellation(e: boolean) { this.cancellation_dialog = false; }


  openExperience() { this.experience_dialog = true; }
  closeExperience(e: boolean) { this.experience_dialog = false; }
}
