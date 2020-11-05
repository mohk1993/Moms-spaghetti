import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rate-experience-dialog',
  templateUrl: './rate-experience-dialog.component.html',
  styleUrls: ['./rate-experience-dialog.component.scss']
})
export class RateExperienceDialogComponent {

  constructor() {}

  @Output() close: EventEmitter<boolean> = new EventEmitter();
  shutdown() { this.close.emit(true); }

}
