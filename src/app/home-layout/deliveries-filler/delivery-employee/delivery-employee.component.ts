import { Component,OnDestroy,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Delivery } from 'src/app/interfaces/delivery.interface';
import { Order } from 'src/app/interfaces/order.interface';
import { DeliveryService } from 'src/app/services/delivery.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-delivery-employee',
  templateUrl: './delivery-employee.component.html',
  styleUrls: ['./delivery-employee.component.scss']
})
export class DeliveryEmployeeComponent implements OnInit, OnDestroy{
  
  orderID:string;
  delivery:Delivery ={
    comment: null,
    createdAt: null,
    deliveryCompleteTime: null,
    deliveryPrice: null,
    deliveryStatus: null,
    deliveryType: null,
    id: null,
    orderId: null,
    location: null,
    requestedDeliveryTime: null,
    reviewId: null
  }

  getDeliverySubscription: Subscription;
  updateDeliverySubscription: Subscription;

  options: Array<string> = new Array<string>('waiting', 'delivering', 'delivered');
  constructor(private readonly route:ActivatedRoute, private router: Router,
    private orderService: OrderService, private deliveryService: DeliveryService) {
    this.route.queryParams.subscribe(param => {
      this.orderID = param["order_id"];
      if (this.orderID)
        this.orderService.getOrder(this.orderID);
      else
        this.router.navigate['/employee'];
      if (this.orderID == null) {
        // this.router.navigate(["/"]);
      }
    });
  }

  ngOnInit(){
    this.getDeliverySubscription = this.orderService.getOrderSubject.subscribe({
      next: (res) => {
        if(!res.error) {
          console.log(res);
          this.delivery = <Delivery>(<Order>res).delivery;
        } console.log(res);
      }
    });
    
  }

  ngOnDestroy(){
    if(this.getDeliverySubscription) this.getDeliverySubscription.unsubscribe();
  }
  
  statusChange(status: string) {
    this.delivery.deliveryStatus = status;
    this.deliveryService.putDelivery(this.delivery.orderId.toString(), this.delivery)
  }

}
