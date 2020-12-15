import {Component, OnDestroy,OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { from } from 'rxjs';

//services 
import { dishServices } from 'src/app/services/dish.service';
import { AuthService } from 'src/app/services/auth.service';

// Interfaces 
import { Dish } from 'src/app/interfaces/dish.interface';
import { PopularDish } from 'src/app/interfaces/popular-dish.interface';

@Component({
  selector: 'app-dish',
  templateUrl: './popular-dish.component.html',
  styleUrls: ['./popular-dish.component.scss']
})
export class PopularDishComponent implements OnInit, OnDestroy{
  
  popularDishes: Array<PopularDish>
  getAllPopularDishesSubscription: Subscription;


  constructor(private auth:AuthService, private dishService: dishServices, public router: Router) {
    this.popularDishes = new Array<PopularDish>();
    this.dishService.getPopularDishes();
  }

  remove_dish_dialog: boolean = false;
  update_dish_dialog: boolean = false;

  openConfirmation() { this.update_dish_dialog = true; }
  closeConfirmation(e: boolean) { this.update_dish_dialog = false; }

  openDelete() { this.remove_dish_dialog = true; }
  closeDelete(e: boolean) { this.remove_dish_dialog = false; }

  ngOnInit() {
    this.getAllPopularDishesSubscription = this.dishService.getPopularDishesSubject.subscribe({
      next: (res) =>{
        if(!(res.error)){
          this.popularDishes =res;
          console.log(this.popularDishes)
          console.log(res);
        }else {
          console.log(res);
        }
      }
    });
  }

ngOnDestroy() {
  if(this.getAllPopularDishesSubscription) this.getAllPopularDishesSubscription.unsubscribe();
}


}
