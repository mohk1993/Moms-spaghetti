import { Component,OnDestroy,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Delivery } from 'src/app/interfaces/delivery.interface';
import { DeliveryService } from 'src/app/services/delivery.service';

@Component({
  selector: 'app-delivery-employee',
  templateUrl: './delivery-employee.component.html',
  styleUrls: ['./delivery-employee.component.scss']
})
export class DeliveryEmployeeComponent implements OnInit, OnDestroy{
  deliveryId:string;
  delivery:Delivery ={
    comment: null,
    createdAt: null,
    deliveryCompleteTime: null,
    deliveryStatus: null,
    deliveryType: null,
    id: null,
    location: null,
    requestedDeliveryTime: null,
    reviewId: null
  }
  constructor(private readonly route:ActivatedRoute,private delieryService:DeliveryService, private router: Router) {
    this.route.queryParams.subscribe(param=>{
      this.deliveryId=param["deliveryId"];
      if(this.deliveryId)
        this.delieryService.getdelivery(this.deliveryId);
      else
        this.router.navigate['/employee'];
        console.log(this.deliveryId)
      // if(this.deliveryId==null){
      //   this.router.navigate(["/"]);
      // }
    })
    // console.log(new Date().toISOString())
  }

  ngOnInit(){

  }

  ngOnDestroy(){

  }

  cancellation_dialog: boolean = false;

  openCancellation() { this.cancellation_dialog = true; }
  closeCancellation(e: boolean) { this.cancellation_dialog = false; }
}
