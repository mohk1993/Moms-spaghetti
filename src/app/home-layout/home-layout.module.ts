import { NgModule } from '@angular/core';

import { HomeLayoutRoutingModule } from './home-layout-routing.module';
import { HomeLayoutComponent } from './home-layout.component';

@NgModule({
  declarations: [
    HomeLayoutComponent
  ],
  imports: [
    
    HomeLayoutRoutingModule,
    
  ]
})
export class HomeLayoutModule { }
