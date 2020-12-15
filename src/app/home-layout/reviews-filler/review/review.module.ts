import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ReviewRoutingModule } from './review-routing.module';
import { ReviewComponent } from './review.component';

@NgModule({
  declarations: [
    ReviewComponent
  ],
  imports: [
    ReviewRoutingModule,
    CommonModule,
    FormsModule
    
  ]
})
export class ReviewModule { }
