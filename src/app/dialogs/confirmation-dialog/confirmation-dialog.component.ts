import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  constructor() {}

  @Output() close: EventEmitter<boolean> = new EventEmitter();
  shutdown() { this.close.emit(true); }

}
