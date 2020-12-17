import {Component, OnDestroy,OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { AuthService } from 'src/app/services/auth.service';
import { dishServices } from 'src/app/services/dish.service';
import { Dish } from 'src/app/interfaces/dish.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';


@Component({
  selector: 'app-view-dish',
  templateUrl: './view-dish.component.html',
  styleUrls: ['./view-dish.component.scss']
})
export class ViewDishComponent implements OnInit, OnDestroy {

  dish_id:string;
  back_url: string;
  dish: Dish = {
    id: null,

    name: null,
    description: null,    

    keto: null,

    price: null,
    profitMargin: null,
    quantity: null,
    
    alcoholContent: null,

    vegan: null,
    vegetarian: null,
    nutritionalInformation: null,
    allergenInformation: null,
  }
  getDishSubscription: Subscription;


  constructor(private auth:AuthService, private dishService: dishServices, public router: Router, public route:ActivatedRoute){
    this.route.queryParams.subscribe(params => {
      this.dish_id = params['dish_id'];
      this.back_url = params['back_url'];
      console.log(params['dish_id']);
      if(this.dish_id)
        this.dishService.getDish(this.dish_id);
      else
        this.router.navigate['/dish'];
    });

  }
 
  ngOnInit(){
    this.getDishSubscription = this.dishService.getDisheSubject.subscribe({
      next: (res) => {
        if(!(res.error)){
         this.dish = res;
        }else {
          console.log(res);
        }
      }
    });
  }

  ngOnDestroy(){
    if(this.getDishSubscription) this.getDishSubscription.unsubscribe();
  }

  return() {
    console.log(this.back_url);
    if(this.back_url) window.location.assign(this.back_url);
    else this.router.navigate(['/dishes']);
  }
}
