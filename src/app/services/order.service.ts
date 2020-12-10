import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../interfaces/order.interface';
import { Order_dish } from '../interfaces/order_dish.interface';
import { Review } from '../interfaces/review.interface';

@Injectable()
export class OrderService {
    

    getOrdersSubject = new Subject<any>();
    getOrderSubject = new Subject<any>();
    getOrderReviewSubject = new Subject<any>();

    postOrderSubject = new Subject<any>();
    postOrderReviewSubject = new Subject<any>();


    putOrderDishSubject = new Subject<any>();
    putOrderStatusSubject = new Subject<any>();
    
    constructor(private http: HttpClient) {

    }

    getOrders() {
        this.http.get(environment.key + 'orders').subscribe({
            next: (res) => { this.getOrdersSubject.next(res);   },
            error:  (e) => { this.getOrdersSubject.next(e);     }
        });
    }
    getOrder(id: string) {
        this.http.get(environment.key + 'orders/' + id).subscribe({
            next: (res) => { this.getOrderSubject.next(res);   },
            error:  (e) => { this.getOrderSubject.next(e);     }
        });
    }
    getOrderReview(id: string) {
        this.http.get(environment.key + 'orders/' + id + '/review').subscribe({
            next: (res) => { this.getOrderReviewSubject.next(res);   },
            error:  (e) => { this.getOrderReviewSubject.next(e);     }
        });
    }

    postOrder(order: Order) {
        this.http.post(environment.key + 'orders', order).subscribe({
            next: (res) => { this.postOrderSubject.next(res);   },
            error:  (e) => { this.postOrderSubject.next(e);     }
        });
    }
    postOrderReview(id: string, review: Review) {
        this.http.post(environment.key + 'orders/' + id + '/review', review).subscribe({
            next: (res) => { this.postOrderReviewSubject.next(res);   },
            error:  (e) => { this.postOrderReviewSubject.next(e);     }
        });
    }

    putOrderDish(id: string, order_dish: Order_dish) {
        this.http.put(environment.key + 'orders/' + id + '/dish', order_dish).subscribe({
            next: (res) => { this.putOrderDishSubject.next(res);   },
            error:  (e) => { this.putOrderDishSubject.next(e);     }
        });
    }
    putOrderStatus(id: string, status: string) {
        this.http.post(environment.key + 'orders/' + id + '/status', status).subscribe({
            next: (res) => { this.putOrderStatusSubject.next(res);   },
            error:  (e) => { this.putOrderStatusSubject.next(e);     }
        });
    }
    



}