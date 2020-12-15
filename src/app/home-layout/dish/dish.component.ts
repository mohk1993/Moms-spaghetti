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

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit, OnDestroy{
  
  dishes: Array<Dish>
  getAllDishesSubscription: Subscription;
  deleteDishesSubscription: Subscription;
  createDishesSubscription: Subscription;


  loadingMessage = "Loading Data, Please wait...";

  constructor(private auth:AuthService, private dishService: dishServices, public router: Router) {
    this.dishes = new Array<Dish>();
    this.dishService.getAllDishes();
  }
  deleteDish(i:number){
    if(confirm("Are you sure you want to delete " + this.dishes[i].name + "?"))
    this.dishService.deleteDish(this.dishes[i].id.toString());
  }

  remove_dish_dialog: boolean = false;
  update_dish_dialog: boolean = false;

  openConfirmation() { this.update_dish_dialog = true; }
  closeConfirmation(e: boolean) { this.update_dish_dialog = false; }

  openDelete() { this.remove_dish_dialog = true; }
  closeDelete(e: boolean) { this.remove_dish_dialog = false; }

  ngOnInit() {
    this.getAllDishesSubscription = this.dishService.getAllDishesSubject.subscribe({
      next: (res) =>{
        if(!(res.error)){
          this.dishes =res;
        }else {
          console.log(res);
        }
      }
    });

    this.deleteDishesSubscription = this.dishService.deleteDishesSubject.subscribe({
      next: () =>{
          this.dishService.getAllDishes();
      }
    });
  }

ngOnDestroy() {
  if(this.getAllDishesSubscription) this.getAllDishesSubscription.unsubscribe();
  if(this.deleteDishesSubscription) this.deleteDishesSubscription.unsubscribe();
}

editDish(id:number){
  this.router.navigate(['/edit-dish'], { queryParams: { dish_id: id } });
}

}
