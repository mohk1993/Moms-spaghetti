import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delivery-employee',
  templateUrl: './delivery-employee.component.html',
  styleUrls: ['./delivery-employee.component.scss']
})
export class DeliveryEmployeeComponent {
  deliveryId:string;
  constructor(private readonly route:ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(param=>{
      this.deliveryId=param["deliveryId"];
      // if(this.deliveryId==null){
      //   this.router.navigate(["/"]);
      // }
    })
    console.log(new Date().toISOString())
  }

  cancellation_dialog: boolean = false;

  openCancellation() { this.cancellation_dialog = true; }
  closeCancellation(e: boolean) { this.cancellation_dialog = false; }
}
