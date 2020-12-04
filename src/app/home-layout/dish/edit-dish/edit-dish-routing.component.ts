import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDishComponent } from './edit-dish.component';


const routes: Routes = [
  {
    path: '**',
    pathMatch: 'full',
    component: EditDishComponent,
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditDishRoutingModule { }
