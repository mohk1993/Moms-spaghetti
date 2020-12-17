import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewDishComponent } from './view-dish.component';


const routes: Routes = [
  {
    path: '**',
    pathMatch: 'full',
    component: ViewDishComponent,
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewDishRoutingModule { }
