import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cancellation-dialog',
  templateUrl: './cancellation-dialog.component.html',
  styleUrls: ['./cancellation-dialog.component.scss']
})
export class CancellationDialogComponent {

  constructor() {}

  @Output() close: EventEmitter<boolean> = new EventEmitter();
  shutdown() { this.close.emit(true); }

}
