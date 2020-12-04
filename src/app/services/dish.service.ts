import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
// services 
import { AuthService } from '../services/auth.service';

// Interfaces
import { Dish } from '../interfaces/dish.interface';

@Injectable()

export class dishServices {

createDishSubject = new Subject<any>();

getAllDishesSubject = new Subject<any>();
getDisheSubject = new Subject <any>();
deleteDishesSubject = new Subject<any>();
updateDishSubject = new Subject<any>();

constructor(private readonly auth: AuthService,private http: HttpClient){}
dishes: Dish;
createDish(name: string, description: string, price: number, profitMargin: number, quantity: number, alcoholContent: number, nutritionalInformation: string, allergenInformation: string, vegan: boolean, vegetarian: boolean, keto: boolean) {
    this.http.post(environment.key+'dishes', {
        name: name,
        description: description,
        price: price,
        profitMargin: profitMargin,
        quantity: quantity,
        alcoholContent: alcoholContent,
        nutritionalInformation: nutritionalInformation,
        allergenInformation: allergenInformation,
        vegan: vegan,
        vegetarian: vegetarian,
        keto: keto
    }).subscribe({
        next: (res) => { this.createDishSubject.next(res); },
        error:  (e) => { this.createDishSubject.next(e); }
    });
}

getAllDishes(){
    this.http.get(environment.key+'dishes').subscribe({
        next: (res) => { this.getAllDishesSubject.next(<{}>res);},
        error: (e) => { this.getAllDishesSubject.next(e);}
    });
}
getDish(id:string){
    this.http.get(environment.key+'dishes/'+id).subscribe({
        next: (res) => { this.getDisheSubject.next(res);},
        error: (e) => { this.getDisheSubject.next(e);}
    });
}
updateDish(dish:Dish){
    this.http.put(environment.key+'dishes/'+dish.id,dish).subscribe({
        next: (res) => {this.updateDishSubject.next(res)},
        error: (e) => { this.updateDishSubject.next(e);}
    });
}

deleteDish (id:string){
    this.http.delete(environment.key+'dishes/'+id).subscribe({
        next: () => { this.deleteDishesSubject.next();},
        error: (e) => { this.deleteDishesSubject.next(e);}
    });
}

} 
