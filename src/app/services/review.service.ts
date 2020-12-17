import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
// services 
import { AuthService } from '../services/auth.service';
import { Review } from 'src/app/interfaces/review.interface';
import { Reviews } from '../interfaces/reviews.interfave';

@Injectable()

export class reviewService {

    getAllReviewsSubject = new Subject<any>();
    getReviewSubject = new Subject <any>();

    postDeliveryReviewSubject = new Subject<any>();
    postReservationReviewSubject = new Subject<any>();

    constructor(private readonly auth: AuthService,private http: HttpClient){}

    reviews: Reviews;

    getAllReviews(){
        this.http.get(environment.key+'/reviews').subscribe({
            next: (res) => { this.getAllReviewsSubject.next(<{}>res);},
            error: (e) => { this.getAllReviewsSubject.next(e);}
        });
    }

    getReview(id:string){
        this.http.get(environment.key+'reviews/'+id).subscribe({
            next: (res) => { this.getReviewSubject.next(res);},
            error: (e) => { this.getReviewSubject.next(e);}
        });
    }

    postReservationReview(id: string, review: Review) {
        this.http.post(environment.key + 'reservations/' + id + '/review', review).subscribe({
            next: (res) => { this.postReservationReviewSubject.next(res); },
            error:  (e) => { this.postReservationReviewSubject.next(e); },
        });
    }
    postDeliveryReview(id: string, review: Review) {
        this.http.post(environment.key + 'deliveries/' + id + '/review', review).subscribe({
            next: (res) => { this.postDeliveryReviewSubject.next(res); },
            error:  (e) => { this.postDeliveryReviewSubject.next(e); },
        });
    }

    

}

