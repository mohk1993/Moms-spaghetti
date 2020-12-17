import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Delivery } from 'src/app/interfaces/delivery.interface';
import { Dish } from 'src/app/interfaces/dish.interface';
import { Order } from 'src/app/interfaces/order.interface';
import { Order_dish } from 'src/app/interfaces/order_dish.interface';
import { DeliveryService } from 'src/app/services/delivery.service';
import { dishServices } from 'src/app/services/dish.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-delivery',
  templateUrl: './order-delivery.component.html',
  styleUrls: ['./order-delivery.component.scss']
})
export class OrderDeliveryComponent implements OnInit, OnDestroy{

  orderId:string;
  postOrderDeliverySubscription: Subscription;

  delivery: Delivery = {
    comment: null,
    createdAt: null,
    deliveryCompleteTime: null,
    deliveryStatus: null,
    deliveryType: null,
    id: null,
    orderId: null,
    location: null,
    requestedDeliveryTime: null,
    reviewId: null
  };

  constructor(private readonly route:ActivatedRoute, private router: Router,
    private orderService: OrderService, private deliveryService: DeliveryService) {
    
      this.route.queryParams.subscribe(param=>{
      this.orderId=param["order_id"];
      if(this.orderId==null){
        this.router.navigate(["/orders/delivery"]);
      } else this.orderService.getOrder(this.orderId);
    });
  }

  ngOnInit() {
    this.postOrderDeliverySubscription = this.deliveryService.postDeliverySubject.subscribe({
      next: (res) => {
        if(!res.error) {
          console.log(res);
          this.router.navigate(['orders/delivery'], { queryParams: { order_id: res.id.toString() }});
        } else console.log(res);
      }
    })
  }

  ngOnDestroy() {

  }
  postDelivery(){
      this.deliveryService.postDelivery(
        this.orderId,
        this.delivery.comment,
        this.delivery.createdAt,
        this.delivery.deliveryCompleteTime,
        this.delivery.deliveryStatus,
        this.delivery.deliveryType,
        this.delivery.location,
        this.delivery.requestedDeliveryTime,
        this.delivery.reviewId
      );
  }

}
