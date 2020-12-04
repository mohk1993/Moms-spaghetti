import {Component, OnDestroy,OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { AuthService } from 'src/app/services/auth.service';
import { dishServices } from 'src/app/services/dish.service';
import { Dish } from 'src/app/interfaces/dish.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';


@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.scss']
})
export class AddDishComponent implements OnInit, OnDestroy {
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
  createdishSubscription: Subscription;

  constructor(private auth:AuthService, private dishService: dishServices, public router: Router, public route:ActivatedRoute) {

  }
  ngOnInit() {
    this.createdishSubscription = this.dishService.createDishSubject.subscribe({
      next: (res) => {
        if(!res.error) {
          console.log(res);

          this.router.navigate(['/dish']);


        } else console.log('error', res);
      }
    });
  }


  ngOnDestroy() {
    if(this.createdishSubscription) this.createdishSubscription.unsubscribe();

  }
  createDish(){
    const id = + this.route.snapshot.paramMap.get("id");
      this.dishService.createDish(
        this.dish.name,
        this.dish.description,
        this.dish.price,
        this.dish.profitMargin,
        this.dish.quantity,
        this.dish.alcoholContent,
        this.dish.nutritionalInformation,
        this.dish.allergenInformation,
        this.dish.vegan,
        this.dish.vegetarian,
        this.dish.keto,
      );
  }

}
