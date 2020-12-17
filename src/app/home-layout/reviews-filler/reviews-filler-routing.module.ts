import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewsFillerComponent } from './reviews-filler.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: ReviewsFillerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./reviews/reviews.module').then(m => m.ReviewsModule)
      },
      {
        path: 'create',
        loadChildren: () => import('./review/review.module').then(m => m.ReviewModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewsFillerRoutingModule { }
