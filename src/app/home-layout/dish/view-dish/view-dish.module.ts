import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ViewDishRoutingModule } from './view-dish-routing.component';
import { ViewDishComponent } from './view-dish.component';

@NgModule({
  declarations: [
    ViewDishComponent
  ],
  imports: [
    ViewDishRoutingModule,
    CommonModule,
    FormsModule,
  ]
})
export class ViewDishModule { }
