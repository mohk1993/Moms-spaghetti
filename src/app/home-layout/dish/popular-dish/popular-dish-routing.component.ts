import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopularDishComponent } from './popular-dish.component';


const routes: Routes = [
  {
    path: '**',
    pathMatch: 'full',
    component: PopularDishComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PopularDishRoutingModule { }
