import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  constructor() {}

  cancellation_dialog: boolean = false;
  confirmation_dialog: boolean = false;

  openCancellation() { this.cancellation_dialog = true; }
  closeCancellation(e: boolean) { this.cancellation_dialog = false; }

  openConfirmation() { this.confirmation_dialog = true; }
  closeConfirmation(e: boolean) { this.confirmation_dialog = false; }

}
