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
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, OnDestroy{

  reviews: Array<Reviews>
  getAllReviewsSubscription: Subscription;
  getReviewSubscription: Subscription;

  constructor(private auth:AuthService, private reviewService: reviewService, public router: Router,public route:ActivatedRoute) {

    this.reviews = new Array<Reviews>();
    this.reviewService.getAllReviews();
  }

  ngOnInit() {
    this.getAllReviewsSubscription = this.reviewService.getAllReviewsSubject.subscribe({
      next: (res) =>{
        if(!(res.error)){
          this.reviews =res;
          // console.log(this.reviews)
          // console.log(res);
        }else {
          console.log(res);
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.getAllReviewsSubscription)
      this.getAllReviewsSubscription.unsubscribe();
  }

  goToDelivery(deliveryId: number) {
    this.router.navigate(["/deliveries/single"], {
      queryParams: { delivery_id: deliveryId },
    });
  }

  goToReservation(reservationId: number) {
    this.router.navigate(["/reservations/single"], {
      queryParams: { reservation_id: reservationId },
    });
  }
}