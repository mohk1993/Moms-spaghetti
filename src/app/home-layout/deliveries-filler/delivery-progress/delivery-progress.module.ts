import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CancellationDialogModule } from 'src/app/dialogs/cancellation-dialog/cancellation-dialog.module';
import { RateExperienceDialogModule } from 'src/app/dialogs/rate-experience-dialog/rate-experience-dialog.module';

import { DeliveryProgressRoutingModule } from './delivery-progress-routing.module';
import { DeliveryProgressComponent } from './delivery-progress.component';

@NgModule({
  declarations: [
    DeliveryProgressComponent
  ],
  imports: [
    DeliveryProgressRoutingModule,
    CommonModule,

    CancellationDialogModule,
    RateExperienceDialogModule
  ]
})
export class DeliveryProgressModule { }
