import {Component, OnDestroy,OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { Review } from 'src/app/interfaces/review.interface';
import { reviewService } from 'src/app/services/review.service';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit, OnDestroy{

  reservationID: string;
  deliveryID: string;

  review: Review = {
    id: null,

    comment: null,
    rating: 1,
    deliveryId: null,
    reservationId: null
  }

  postDeliveryReviewSubscription: Subscription;
  postReservationReviewSubscription: Subscription;

  constructor(private auth:AuthService, private reviewService: reviewService, public router: Router,public route:ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      this.deliveryID = params['delivery_id'];
      this.reservationID = params['reservation_id'];
      // console.log(params['review_id']);
    });
  }

  ngOnInit(){
    this.postDeliveryReviewSubscription = this.reviewService.postDeliveryReviewSubject.subscribe({
      next: (res) => {
        if(!res.error) {
          this.router.navigate(['/orders']);
        } console.log(res);
      }
    });
    this.postReservationReviewSubscription = this.reviewService.postReservationReviewSubject.subscribe({
      next: (res) => {
        if(!res.error) {
          this.router.navigate(['/reservations']);
        } console.log(res);
      }
    });
  }
  ngOnDestroy(){
    if(this.postDeliveryReviewSubscription) this.postDeliveryReviewSubscription.unsubscribe();
    if(this.postReservationReviewSubscription) this.postReservationReviewSubscription.unsubscribe();
  }

  changeRating(val: number) {
    console.log(val)
    this.review.rating = val;
  }
  createReview() {
    if(this.deliveryID != null) this.reviewService.postDeliveryReview(this.deliveryID, this.review);
    else if(this.reservationID != null) this.reviewService.postReservationReview(this.reservationID, this.review);
  }

}
