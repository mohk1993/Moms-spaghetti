import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Delivery } from 'src/app/interfaces/delivery.interface';
import { Dish } from 'src/app/interfaces/dish.interface';
import { Order } from 'src/app/interfaces/order.interface';
import { Order_dish } from 'src/app/interfaces/order_dish.interface';
import { Reservation } from 'src/app/interfaces/reservation.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DeliveryService } from 'src/app/services/delivery.service';
import { dishServices } from 'src/app/services/dish.service';
import { OrderService } from 'src/app/services/order.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
  host: {
    '(document:keypress)': 'saveChanges()',
  }
})
export class CreateOrderComponent implements OnInit, OnDestroy{

  orderId:string;
  reservationID: string;
  
  getReservationSubscription: Subscription;
  postOrdersSubscription: Subscription;
  putReservationSubscription: Subscription;
  getDishesSubscription: Subscription;

  postDeliverySubscription: Subscription;

  order: Order = {
    id: null,
    orderNumber: null,
    status: "awaiting",
    price: null,
    delivery: <Delivery>{
      id: null,
      orderId: null,
      reviewId: null,
  
      comment: null,
      location: null,
  
      deliveryStatus: "waiting",
      deliveryType: 'take-away',
  
      deliveryCompleteTime: null,
      requestedDeliveryTime: null,
  
      createdAt: null,
    }, 
    dishes: new Array<Dish>(),
    orderDishes:new Array<Order_dish>(),
    
    comment: null,
  };
  reservation: Reservation;
  dishes: Array<Dish>;

  deliveryDate: string;
  deliveryTime: string;
  

  
  constructor(private readonly route:ActivatedRoute, private router: Router,
    private readonly auth: AuthService,
    private orderService: OrderService, private dishService: dishServices, 
    private deliveryService: DeliveryService, private reservationService: ReservationService) {

      if(this.auth.customer)
        this.order.delivery.location = this.auth.customer.address ? this.auth.customer.address : null;
    this.dishes = new Array<Dish>();
    this.dishService.getAllDishes();

    let year = new Date().getFullYear().toString();
      year += '-';
      year += (new Date().getMonth() + 1) >= 10 ? (new Date().getMonth() + 1).toString() : '0'+(new Date().getMonth() + 1).toString(); 
      year += '-';
      year += new Date().getDate() >= 10 ? new Date().getDate().toString() : "0"+new Date().getDate().toString();

      let time = new Date().getHours() >= 10 ? new Date().getHours().toString() : "0"+new Date().getHours().toString();
      time += ":"
      time+= new Date().getMinutes() >= 10 ? new Date().getMinutes().toString() : '0'+new Date().getMinutes().toString();

      this.deliveryDate = year.toString();
      this.deliveryTime = time.toString();

      this.route.queryParams.subscribe(params => {
        this.orderId = params['order_id'];
        this.reservationID = params['reservation_id'];

        if(JSON.parse(localStorage.getItem('order'))) {
          this.order = JSON.parse(localStorage.getItem('order'));
          if(this.order.delivery) {
            this.deliveryDate = this.order.delivery.requestedDeliveryTime.split('T')[0];
            this.deliveryTime = this.order.delivery.requestedDeliveryTime.split('T')[1].substring(0, 5);
          }
        }

        if(this.reservationID != null) this.reservationService.getReservation(this.reservationID);
      });
  }

  ngOnInit() {
    this.getDishesSubscription = this.dishService.getAllDishesSubject.subscribe({
      next: (res) => {
        if(!res.error) {

          console.log(res);
          this.dishes = <Array<Dish>>res;

        } else console.log(res);
      }
    });
    this.getReservationSubscription = this.reservationService.getReservationSubject.subscribe({
      next: (res) => {
        if(!res.error) {
          this.reservation = <Reservation>res;
          this.order.comment = 'Order for reservation #' + this.reservationID + ' On \n';
          this.order.comment += this.reservation.startTime + ' - ' + this.reservation.endTime + '\n';

        } console.log(res);
      }
    });
    this.postOrdersSubscription = this.orderService.postOrderSubject.subscribe({
      next: (res) => {
        if(!res.error) {
          console.log(res);
          if(this.reservationID) {

            this.reservation.orderId = (<Order>res).id;
            this.reservationService.putReservation(this.reservationID, this.reservation);

          } else switch(this.state) {
            case 'reservation' :
              this.router.navigate(['reservations/create'], { queryParams: { order_id: res.id.toString() }});
              break;
            case 'pick-up' :
              this.order.delivery.orderId = res.id;
              this.deliveryService.postDelivery(res.id.toString(), this.order.delivery);
          };
          this.state = null;
          localStorage.removeItem('order');

        } else console.log(res);
      }
    });
    this.postDeliverySubscription = this.deliveryService.postDeliverySubject.subscribe({
      next: (res) => {
        if(!res.error) {
          console.log(res);
          this.router.navigate(['deliveries/progress'], { queryParams: { order_id: res.id.toString() }});
        } console.log(res);
      }
    });
    this.putReservationSubscription = this.reservationService.putReservationSubject.subscribe({
      next: (res) => {
        if(!res.error) {

          this.router.navigate(['/reservations/single'], { queryParams: { reservation_id: this.reservationID }});

        } console.log(res);
      }
    });
  }
  ngOnDestroy() {
    if(this.getDishesSubscription) this.getDishesSubscription.unsubscribe();
    if(this.getReservationSubscription) this.getReservationSubscription.unsubscribe();
    if(this.postOrdersSubscription) this.postOrdersSubscription.unsubscribe();
    if(this.postDeliverySubscription) this.postDeliverySubscription.unsubscribe();
    if(this.putReservationSubscription) this.putReservationSubscription.unsubscribe();
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

  saveChanges() {
    localStorage.setItem('order', JSON.stringify(this.order));
  }

  state: string;
  orderCreate(id: string) {
    this.order.delivery.requestedDeliveryTime = new Date(this.deliveryDate+"T"+this.deliveryTime+":00").toISOString();


    this.state = id;
    this.orderService.postOrder(this.order);
  }
  

  addDish(i: number, val: number) {
    let temp = <Dish>JSON.parse(JSON.stringify(this.dishes[i]));
    temp.quantity = 0;
    try {
      temp.quantity = parseInt(val.toString());
    } catch(e) {
      temp.quantity = 0;
      console.log(e);
    }
    this.order.dishes.push(temp);
    this.order.orderDishes.push(<Order_dish>{
      dishId: this.dishes[i].id,
      orderId: null,
      quantity: temp.quantity,
      profitMargin: this.dishes[i].profitMargin,
      total: this.dishes[i].price * temp.quantity
    });
    localStorage.setItem('order', JSON.stringify(this.order));
  }
  removeDish(i: number) {
    this.order.dishes.splice(i, 1);
    this.order.orderDishes.splice(i, 1);
    localStorage.setItem('order', JSON.stringify(this.order));
  }
  viewDish(i: number) {
    localStorage.setItem('order', JSON.stringify(this.order));
    console.log('hey')
    this.router.navigate(['/view-dish'], { queryParams: { dish_id: 
      this.dishes[i].id, 
      back_url: window.location.href }})
  }

}
