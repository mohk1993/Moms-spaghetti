import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {

  orderId:string;
  constructor(private readonly route:ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(param=>{
      this.orderId=param["order_id"];
      if(this.orderId==null){
        this.router.navigate(["/"]);
      }
    })
  }
}
