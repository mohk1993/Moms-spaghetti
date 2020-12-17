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

  image: File;
  
  createdishSubscription: Subscription;
  createDishImageSubscription: Subscription;
  constructor(private auth:AuthService, private dishService: dishServices, public router: Router, public route:ActivatedRoute) {

  }
  created: boolean = false;

  ngOnInit() {
    this.createdishSubscription = this.dishService.createDishSubject.subscribe({
      next: (res) => {
        if(!res.error) {
          console.log(res);

          this.dish = <Dish>res;
          if(confirm('Do you wish to add image?')) {
            this.created = true;
            document.getElementById('file').click();
          } else this.router.navigate(['/dish']);

        } else console.log('error', res);
      }
    });
    this.createDishImageSubscription = this.dishService.createDishImageSubject.subscribe({
      next: (res) => {
        if(!res.error) {
          this.router.navigate(['/dish'])
        } console.log(res);
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

  imageUrl: string;
  changeImage(event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.dishService.createDishImage(this.dish.id.toString(), file);
    (document.getElementById('file') as HTMLInputElement).value = '';
  }

}
