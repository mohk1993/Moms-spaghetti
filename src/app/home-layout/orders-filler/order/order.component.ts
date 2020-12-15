import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dish } from 'src/app/interfaces/dish.interface';
import { Order } from 'src/app/interfaces/order.interface';
import { Order_dish } from 'src/app/interfaces/order_dish.interface';
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
  putOrderDishSubscription: Subscription;
  getDishesSubscription: Subscription;

  order: Order = {
    id: null,
    orderNumber: null,
    status: null,
    total: null,

    dishes: [],
    
    comment: null,
  };
  dishes: Array<Dish>;
  
  constructor(private readonly route:ActivatedRoute, private router: Router,
    private orderService: OrderService, private dishService: dishServices) {
    
      this.route.queryParams.subscribe(param=>{
      this.orderId=param["order_id"];
      if(this.orderId==null){
        this.router.navigate(["/"]);
      } else this.orderService.getOrder(this.orderId);
    });
    this.dishes = new Array<Dish>();
    this.dishService.getAllDishes();
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
    this.putOrderDishSubscription = this.orderService.putOrderDishSubject.subscribe({
      next: (res) => {
        if(!res.error) {

          console.log(res);

        } else console.log(res);
      }
    });
    this.getDishesSubscription = this.dishService.getAllDishesSubject.subscribe({
      next: (res) => {
        if(!res.error) {

          console.log(res);
          this.dishes = <Array<Dish>>res;

        } else console.log(res);
      }
    });
    
  }
  ngOnDestroy() {

  }

  addDish(i: number, val: number) {
    // console.log(i, val);
    try {
      let ord_id = parseInt(this.orderId);
      this.orderService.putOrderDish(this.orderId, <Order_dish>{ 
        dishId: this.dishes[i].id, 
        orderId: ord_id,  
        quantity: val as number,
        total: this.dishes[i].price * val as number
      });
    } catch(e) { console.log('Error in order id parsing'); }
    
  }

}
