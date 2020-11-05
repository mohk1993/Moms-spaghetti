import { NgModule } from '@angular/core';

import { ReviewsRoutingModule } from './reviews-routing.module';
import { ReviewsComponent } from './reviews.component';

@NgModule({
  declarations: [
    ReviewsComponent
  ],
  imports: [
    ReviewsRoutingModule,
    
  ]
})
export class ReviewsModule { }
