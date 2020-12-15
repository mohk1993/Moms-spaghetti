import {Component, OnDestroy,OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { Reviews } from 'src/app/interfaces/reviews.interfave';
import { Review } from 'src/app/interfaces/review.interface';
import { reviewService } from 'src/app/services/review.service';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit, OnDestroy{

  review_id:string;
  review: Reviews = {
    id: null,

    comment: null,
    rating: null,
    deliveryId: null,
    reservationId: null
  }

  getReviewSubscription: Subscription;
  constructor(private auth:AuthService, private reviewService: reviewService, public router: Router,public route:ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      this.review_id = params['review_id'];
      // console.log(params['review_id']);
      if(this.review_id)
        this.reviewService.getReview(this.review_id);
      else
        this.router.navigate['/reviews'];
    });
  }

  ngOnInit(){
    this.getReviewSubscription = this.reviewService.getReviewSubject.subscribe({
      next: (res) => {
        if(!(res.error)){
         this.review = res;
        }else {
          console.log(res);
        }
      }
    });
  }
  ngOnDestroy(){
    if(this.getReviewSubscription) this.getReviewSubscription.unsubscribe();
  }

}
