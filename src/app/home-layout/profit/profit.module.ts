import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ProfitRoutingModule } from './profit-routing.module';
import { ProfitComponent } from './profit.component';

@NgModule({
  declarations: [
    ProfitComponent
  ],
  imports: [
    ProfitRoutingModule,
    NgxChartsModule
  ]
})
export class ProfitModule { }
