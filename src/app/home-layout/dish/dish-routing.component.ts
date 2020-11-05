import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DishComponent } from './dish.component';


const routes: Routes = [
  {
    path: '**',
    pathMatch: 'full',
    component: DishComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DishRoutingModule { }
