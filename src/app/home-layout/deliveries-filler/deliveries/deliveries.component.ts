import { Component, OnDestroy,OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DeliveryService } from 'src/app/services/delivery.service';
import { AuthService } from 'src/app/services/auth.service';

// Interfaces 
import { Delivery } from 'src/app/interfaces/delivery.interface';
@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss']
})
export class DeliveriesComponent implements OnInit, OnDestroy{

deliveries: Array<Delivery>

getAllDeliveriesSubscription: Subscription;

  constructor(private auth:AuthService, private deliveryService: DeliveryService,public route:Router) {
    this.deliveries= new Array<Delivery>();
    this.deliveryService.getDeliveries();
  }

  ngOnInit() {
    this.getAllDeliveriesSubscription = this.deliveryService.getDeliveriesSubject.subscribe({
      next: (res) =>{
        if(!(res.error)){
          this.deliveries= <Array<Delivery>>res;
        } console.log(res);
      }
    });
  }
  ngOnDestroy() {
    if(this.getAllDeliveriesSubscription) this.getAllDeliveriesSubscription.unsubscribe();
  }
  goToDeliveryEmployee(i: number) {
    this.route.navigate(['deliveries/employee'], { queryParams: { order_id: this.deliveries[i].orderId.toString() }});
  }
}
