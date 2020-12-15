import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeLayoutComponent } from './home-layout.component';


const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./orders-filler/orders-filler.module').then(m => m.OrdersFillerModule)
      },
      {
        path: 'reservations',
        loadChildren: () => import('./reservations-filler/reservations-filler.module').then(m => m.ReservationsFillerModule)
      },
      {
        path: 'deliveries',
        loadChildren: () => import('./deliveries-filler/deliveries-filler.module').then(m => m.DeliveriesFillerModule)
      },
      {
        path: 'profit',
        loadChildren: () => import('./profit/profit.module').then(m => m.ProfitModule)
      },
      {
        path: 'reviews',
        loadChildren: () => import('./reviews-filler/reviews-filler.module').then(m => m.ReviewsFillerModule)
      },
      {
        path: 'employees',
        loadChildren: () => import('./employees-filler/employees-filler.module').then(m => m.EmployeesFillerModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule)
      },
      {
        path: 'dish',
        loadChildren: () => import('./dish/dish.module').then(m => m.DishModule)
      },
      {
        path: 'add-dish',
        loadChildren: () => import('./dish/add-dish/add-dish.module').then(m => m.AddDishModule)
      },
      {
        path: 'edit-dish',
        loadChildren: () => import('./dish/edit-dish/edit-dish.module').then(m => m.EditDishModule)
      },
      {
        path: 'popular-dish',
        loadChildren: () => import('./dish/popular-dish/popular-dish.module').then(m => m.PopularDishModule)
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeLayoutRoutingModule { }
