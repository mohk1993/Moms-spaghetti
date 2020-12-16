import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/interfaces/order.interface';
import { AuthService } from 'src/app/services/auth.service';
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
    public auth: AuthService,
    private orderService: OrderService) {

    this.orders = new Array<Order>();
    this.orderService.getOrders();

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

  goToOrder(i: number,target:string) {
    if(target != 'action'){
      this.router.navigate(['/orders/single'], { queryParams: { order_id: this.orders[i].id.toString() }});
    }
  }
  goToDelivery(i: number) {
    this.router.navigate(['deliveries/progress'], { queryParams: { order_id: this.orders[i].id.toString() }});
  }
 
  createOrder() {
    this.router.navigate(['/orders/create']);
  }

  cancellation_dialog: boolean = false;
  confirmation_dialog: boolean = false;

  openCancellation() { this.cancellation_dialog = true; }
  closeCancellation(e: boolean) { this.cancellation_dialog = false; }

  openConfirmation() { this.confirmation_dialog = true; }
  closeConfirmation(e: boolean) { this.confirmation_dialog = false; }

}
