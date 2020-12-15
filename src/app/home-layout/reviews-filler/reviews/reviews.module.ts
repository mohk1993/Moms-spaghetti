import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ReviewsRoutingModule } from './reviews-routing.module';
import { ReviewsComponent } from './reviews.component';

@NgModule({
  declarations: [
    ReviewsComponent
  ],
  imports: [
    ReviewsRoutingModule,
    FormsModule,
    CommonModule
    
  ]
})
export class ReviewsModule { }
