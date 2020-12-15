import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent {
  orderId:string;
  constructor(private readonly route:ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(param=>{
      this.orderId=param["order_id"];
      if(this.orderId==null){
        this.router.navigate(["/"]);
      }
    })  

  }

  cancellation_dialog: boolean = false;

  openCancellation() { this.cancellation_dialog = true; }
  closeCancellation(e: boolean) { this.cancellation_dialog = false; }
}
