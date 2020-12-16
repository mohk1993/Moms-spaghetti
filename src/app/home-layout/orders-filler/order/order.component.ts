import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dish } from 'src/app/interfaces/dish.interface';
import { Order } from 'src/app/interfaces/order.interface';
import { Order_dish } from 'src/app/interfaces/order_dish.interface';
import { AuthService } from 'src/app/services/auth.service';
import { dishServices } from 'src/app/services/dish.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy{

  orderId:string;
  
  getOrderSubscription: Subscription;
  updateOrderStatusSubscription: Subscription;

  order: Order = {
    id: null,
    orderNumber: null,
    status: null,
    price: null,
    delivery:null,
    dishes: new Array<Dish>(),
    orderDishes:new Array<Order_dish>(),
    
    comment: null,
  };
  dishes: Array<Dish>;
  options: Array<string> = new Array<string>('waiting', 'preparing', 'completed', 'cancelled');

  constructor(private readonly route:ActivatedRoute, private router: Router,
    public readonly auth: AuthService,
    private orderService: OrderService, private dishService: dishServices) {
    
      this.route.queryParams.subscribe(param=>{
        this.orderId = param["order_id"];

        if(this.orderId == null){
          this.router.navigate(["/"]);
        } else this.orderService.getOrder(this.orderId);
      
      });
  }

  ngOnInit() {
    this.getOrderSubscription = this.orderService.getOrderSubject.subscribe({
      next: (res) => {
        if(!res.error) {

          console.log(res);
          this.order = <Order>res;

        } else console.log(res);
      }
    });
    this.updateOrderStatusSubscription = this.orderService.putOrderStatusSubject.subscribe({
      next: (res) => {
        if(!res.error) {

          console.log(res);
          this.orderService.getOrder(this.orderId);

        } else console.log(res);
      }
    });
  }
  ngOnDestroy() {
    if(this.getOrderSubscription) this.getOrderSubscription.unsubscribe();
    if(this.updateOrderStatusSubscription) this.updateOrderStatusSubscription.unsubscribe();
  }

  statusChange(status: string) {
    // console.log(status);
    if(confirm('Do you wish to change this order status from ' + this.order.status + ' to ' + status + '?'))
      this.orderService.putOrderStatus(this.orderId, status);
  }


}
