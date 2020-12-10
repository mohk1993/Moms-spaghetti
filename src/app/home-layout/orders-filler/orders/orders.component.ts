import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/interfaces/order.interface';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

  orders: Array<Order>


  getOrdersSubscription: Subscription;

  constructor(private router: Router,
    private orderService: OrderService) {

    this.orders = new Array<Order>(
      {
        id: 1,
        orderNumber: 'No 1',
        status: 'waiting',
        total: 100,

        dishes: null,
        
        comment: null,
      },
      {
        id: 2,
        orderNumber: 'No 2',
        status: 'preparing',
        total: 100,

        dishes: null,
        
        comment: null,
      },
      {
        id: 3,
        orderNumber: 'No 3',
        status: 'completed',
        total: 100,

        dishes: null,
        
        comment: null,
      },
      {
        id: 4,
        orderNumber: 'No 4',
        status: 'cancelled',
        total: 100,

        dishes: null,
        
        comment: null,
      }
    );
    // this.orderService.getOrders();

  }

  ngOnInit() {
    this.getOrdersSubscription = this.orderService.getOrdersSubject.subscribe({
      next: (res) => {
        if(!res.error) {
          console.log(res);
          this.orders = res;
        } else {
          console.log(res);
        }
      }
    });
  }
  ngOnDestroy() {
    if(this.getOrdersSubscription) this.getOrdersSubscription.unsubscribe();
  }

  goToOrder(i: number) {
    this.router.navigate(['orders/single'], { queryParams: { order_id: this.orders[i].id.toString() }});
  }

  cancellation_dialog: boolean = false;
  confirmation_dialog: boolean = false;

  openCancellation() { this.cancellation_dialog = true; }
  closeCancellation(e: boolean) { this.cancellation_dialog = false; }

  openConfirmation() { this.confirmation_dialog = true; }
  closeConfirmation(e: boolean) { this.confirmation_dialog = false; }

}
