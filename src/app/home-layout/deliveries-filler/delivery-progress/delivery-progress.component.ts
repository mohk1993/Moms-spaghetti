import { Component } from '@angular/core';

@Component({
  selector: 'app-delivery-progress',
  templateUrl: './delivery-progress.component.html',
  styleUrls: ['./delivery-progress.component.scss']
})
export class DeliveryProgressComponent {

  constructor() {}

  cancellation_dialog: boolean = false;
  experience_dialog: boolean = false;

  openCancellation() { this.cancellation_dialog = true; }
  closeCancellation(e: boolean) { this.cancellation_dialog = false; }

  openExperience() { this.experience_dialog = true; }
  closeExperience(e: boolean) { this.experience_dialog = false; }

}
