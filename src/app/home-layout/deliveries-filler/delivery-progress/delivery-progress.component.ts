import { query } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Delivery } from 'src/app/interfaces/delivery.interface';
import { Dish } from 'src/app/interfaces/dish.interface';
import { Order } from 'src/app/interfaces/order.interface';
import { Order_dish } from 'src/app/interfaces/order_dish.interface';
import { AuthService } from 'src/app/services/auth.service';
import { dishServices } from 'src/app/services/dish.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-delivery-progress',
  templateUrl: './delivery-progress.component.html',
  styleUrls: ['./delivery-progress.component.scss']
})
export class DeliveryProgressComponent {


  orderId:string;
  
  getOrderSubscription: Subscription;

  delivery: Delivery = {
    comment: null,
    createdAt: null,
    deliveryPrice: null,
    deliveryCompleteTime: null,
    deliveryStatus: null,
    deliveryType: null,
    id: null,
    orderId: null,
    location: null,
    requestedDeliveryTime: null,
    reviewId: null
  };
  timer

  constructor(private readonly route:ActivatedRoute, private router: Router,
    public readonly auth: AuthService,
    private orderService: OrderService, private dishService: dishServices) {
      
      this.route.queryParams.subscribe(param=>{
        this.orderId = param["order_id"];

        if(this.orderId == null){
          this.router.navigate(["/"]);
        } else {
          this.orderService.getOrder(this.orderId)
          this.timer = setInterval(()=>{
            this.orderService.getOrder(this.orderId);
          }, 2 * 60 * 1000)
      }
      
      });
  }

  firstRun: boolean = true;
  ngOnInit() {
    this.getOrderSubscription = this.orderService.getOrderSubject.subscribe({
      next: (res) => {
        if(!res.error) {

          console.log(res);
          this.delivery = <Delivery>(<Order>res).delivery;

          if((<Order>res).status == 'completed' && !this.firstRun) 
            alert('Your order has been completed, awaiting delivery!')
          if(this.delivery.deliveryStatus == 'delivered') {
            alert('Your delivery has been completed!')
          }
          this.firstRun = false;
        } else console.log(res);
      }
    });
  }
  ngOnDestroy() {
    if(this.getOrderSubscription) this.getOrderSubscription.unsubscribe();
    clearInterval(this.timer);
  }

  goToReview() {
    this.router.navigate(['/reviews/create'], { queryParams: { delivery_id: this.delivery.id.toString() }})
  }
}



