import { Component } from '@angular/core';

@Component({
  selector: 'app-delivery-status',
  templateUrl: './delivery-status.component.html',
  styleUrls: ['./delivery-status.component.scss']
})
export class DeliveryStatusComponent {

  constructor() {}

  confirmation_dialog: boolean = false;

  openConfirmation() { this.confirmation_dialog = true; }
  closeConfirmation(e: boolean) { this.confirmation_dialog = false; }

}
