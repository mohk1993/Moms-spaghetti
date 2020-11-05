import { Component } from '@angular/core';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent {

  constructor() {}

  remove_dish_dialog: boolean = false;
  update_dish_dialog: boolean = false;

  openConfirmation() { this.update_dish_dialog = true; }
  closeConfirmation(e: boolean) { this.update_dish_dialog = false; }

  openDelete() { this.remove_dish_dialog = true; }
  closeDelete(e: boolean) { this.remove_dish_dialog = false; }

}
