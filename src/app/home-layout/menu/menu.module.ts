import { NgModule } from '@angular/core';

import { MenuRoutingModule } from './menu-routing.component';
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    MenuRoutingModule,
    
  ]
})
export class MenuModule { }
