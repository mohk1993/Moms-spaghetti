import { NgModule } from '@angular/core';

import { ReviewRoutingModule } from './review-routing.module';
import { ReviewComponent } from './review.component';

@NgModule({
  declarations: [
    ReviewComponent
  ],
  imports: [
    ReviewRoutingModule,
    
  ]
})
export class ReviewModule { }
