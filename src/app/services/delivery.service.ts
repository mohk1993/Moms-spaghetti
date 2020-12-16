import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Review } from '../interfaces/review.interface';
import { Delivery } from '../interfaces/delivery.interface';
import { AuthService } from '../services/auth.service';

@Injectable()
export class DeliveryService {
    

    getDeliveriesSubject = new Subject<any>();
    getDeliverySubject = new Subject<any>();
    getDeliveryReviewSubject = new Subject<any>();

    postDeliverySubject = new Subject<any>();
    postDeliveryReviewSubject = new Subject<any>();


    putDeliverySubject = new Subject<any>();
    putDeliveryStatusSubject = new Subject<any>();
    
    constructor(private http: HttpClient) {

    }

    getDeliveries() {
        this.http.get(environment.key+'deliveries').subscribe({
            next: (res) => { this.getDeliveriesSubject.next(res);   },
            error:  (e) => { this.getDeliveriesSubject.next(e);     }
        });
    }
    getdelivery(order_id: string) {
        this.http.get(environment.key + 'orders/' + order_id+'/deliveries').subscribe({
            next: (res) => { this.getDeliverySubject.next(res);   },
            error:  (e) => { this.getDeliverySubject.next(e);     }
        });
    }
    getDeliveryReview(id: string) {
        this.http.get(environment.key + 'deliveries/' + id + '/review').subscribe({
            next: (res) => { this.getDeliveryReviewSubject.next(res);   },
            error:  (e) => { this.getDeliveryReviewSubject.next(e);     }
        });
    }

    postDelivery(order_id: string, comment: string, createdAt: string,deliveryCompleteTime: string, deliveryStatus: string, deliveryType: string,location: string, requestedDeliveryTime: string,reviewId: number) {
        this.http.post(environment.key + 'orders/' + order_id + '/delivery',{
            comment:comment,
            createAt:createdAt,
            deliveryCompleteTime:deliveryCompleteTime,
            deliveryStatus:deliveryStatus,
            deliveryType:deliveryType,
            location:location,
            requestedDeliveryTime:requestedDeliveryTime,
            reviewId:reviewId
        } ).subscribe({
            next: (res) => { this.postDeliverySubject.next(res);   },
            error:  (e) => { this.postDeliverySubject.next(e);     }
        });
    }
    postDeliveryReview(id: string, review: Review) {
        this.http.post(environment.key + 'deliveries/' + id + '/review', review).subscribe({
            next: (res) => { this.postDeliveryReviewSubject.next(res);   },
            error:  (e) => { this.postDeliveryReviewSubject.next(e);     }
        });
    }

    putDelivery(id: string, delivery: Delivery) {
        this.http.put(environment.key + 'orders/' + id + '/delivery', delivery).subscribe({
            next: (res) => { this.putDeliverySubject.next(res);   },
            error:  (e) => { this.putDeliverySubject.next(e);     }
        });
    }
    putDeliveryStatus(id: string, status: string) {
        this.http.post(environment.key + 'orders/' + id + '/status', status).subscribe({
            next: (res) => { this.putDeliveryStatusSubject.next(res);   },
            error:  (e) => { this.putDeliveryStatusSubject.next(e);     }
        });
    }
    
}