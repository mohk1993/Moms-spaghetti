import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Delivery } from 'src/app/interfaces/delivery.interface';
import { Dish } from 'src/app/interfaces/dish.interface';
import { Order } from 'src/app/interfaces/order.interface';
import { Order_dish } from 'src/app/interfaces/order_dish.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DeliveryService } from 'src/app/services/delivery.service';
import { dishServices } from 'src/app/services/dish.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit, OnDestroy{

  orderId:string;
  
  // getOrderSubscription: Subscription;
  postOrdersSubscription: Subscription;
  putOrderDishSubscription: Subscription;
  getDishesSubscription: Subscription;

  postDeliverySubscription: Subscription;

  order: Order = {
    id: null,
    orderNumber: null,
    status: null,
    price: null,
    delivery: <Delivery>{
      id: null,
      orderId: null,
      reviewId: null,
  
      comment: null,
      location: null,
  
      deliveryStatus: null,
      deliveryType: 'take-away',
  
      deliveryCompleteTime: null,
      requestedDeliveryTime: null,
  
      createdAt: null,
    }, 
    dishes: new Array<Dish>(),
    orderDishes:new Array<Order_dish>(),
    
    comment: null,
  };
  dishes: Array<Dish>;

  deliveryDate: string;
  deliveryTime: string;
  
  constructor(private readonly route:ActivatedRoute, private router: Router,
    private readonly auth: AuthService,
    private orderService: OrderService, private dishService: dishServices, private deliveryService: DeliveryService) {

      if(this.auth.customer)
        this.order.delivery.location = this.auth.customer.address ? this.auth.customer.address : null;
    this.dishes = new Array<Dish>();
    this.dishService.getAllDishes();

    let year = new Date().getFullYear().toString();
      year += '-';
      year += (new Date().getMonth() + 1) > 10 ? (new Date().getMonth() + 1).toString() : '0'+(new Date().getMonth() + 1).toString(); 
      year += '-';
      year += new Date().getDate() > 10 ? new Date().getDate().toString() : "0"+new Date().getDate().toString();

      let time = new Date().getHours() > 10 ? new Date().getHours().toString() : "0"+new Date().getHours().toString();
      time += ":"
      time+= new Date().getMinutes() > 10 ? new Date().getMinutes().toString() : '0'+new Date().getMinutes().toString();

      this.deliveryDate = year.toString();
      this.deliveryTime = time.toString();
  }

  ngOnInit() {
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
    this.postOrdersSubscription = this.orderService.postOrderSubject.subscribe({
      next: (res) => {
        if(!res.error) {
          console.log(res);
          switch(this.state) {
            case 'reservation' :
              this.router.navigate(['reservations/create'], { queryParams: { order_id: res.id.toString() }});
              break;
            case 'delivery' :
              this.order.delivery.orderId = res.id;
              this.deliveryService.postDelivery(res.id.toString(), this.order.delivery);
            // case 'pick-up' :
              // this.router.navigate(['orders/']);
          };
          this.state = null;
        } else console.log(res);
      }
    });
    this.postDeliverySubscription = this.deliveryService.postDeliverySubject.subscribe({
      next: (res) => {
        if(!res.error) {
          console.log(res);
          this.router.navigate(['delivery/progress'], { queryParams: { order_id: res.orderId.toString() }});
        } console.log(res);
      }
    })

    
  }
  ngOnDestroy() {
    if(this.getDishesSubscription) this.getDishesSubscription.unsubscribe();
    if(this.postOrdersSubscription) this.postOrdersSubscription.unsubscribe();
    if(this.putOrderDishSubscription) this.putOrderDishSubscription.unsubscribe();
    if(this.postDeliverySubscription) this.postDeliverySubscription.unsubscribe();
  }
  getTotal() {
    let total = 0;
    this.order.orderDishes.forEach(dish => {
      total = dish.total;
    });
    return total ? total : 0;
  }
  noLower(e) { 
    if(!e.srcElement.value) e.srcElement.value = 1; 
    else if(e.srcElement.value as number >= 99) e.srcElement.value = 99; 
  }

  state: string;
  orderCreate(id: string) {
    this.order.delivery.requestedDeliveryTime = this.deliveryDate+"T"+this.deliveryTime+":00";


    this.state = id;
    this.orderService.postOrder(this.order);
  }
  

  addDish(i: number, val: number) {
    let temp = <Dish>JSON.parse(JSON.stringify(this.dishes[i]));
    temp.quantity = val;
    this.order.dishes.push(temp);
    this.order.orderDishes.push(<Order_dish>{
      dishId: this.dishes[i].id,
      orderId: null,
      quantity: val,
      profitMargin: this.dishes[i].profitMargin,
      total: this.dishes[i].price * val
    });
  }
  removeDish(i: number) {
    this.order.dishes.splice(i, 1);
    this.order.orderDishes.splice(i, 1);
  }

}
