import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {

  constructor() {}

  @Output() close: EventEmitter<boolean> = new EventEmitter();
  
  shutdown() { this.close.emit(true); }

}
