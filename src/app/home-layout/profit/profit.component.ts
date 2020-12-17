import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import { curveCardinal } from 'd3-shape';

@Component({
  selector: 'app-profit',
  templateUrl: './profit.component.html',
  styleUrls: ['./profit.component.scss']
})
export class ProfitComponent implements OnInit, OnDestroy {

  profits: Array<Profit>;

  getProfitsSubscription: Subscription;

  loading: boolean = true;

  horizontal_bar = [
    {
      "name": "Expenses",
      "value": 0,
    },
    {
      "name": "Revenue",
      "value": 0,
    },
  ]
  line = [
    {
      "name": "Germany",
      series: []
    },
  ];
  colorScheme = {
    domain: ['#ee5d48', '#83e377']
  };

  curve:any = curveCardinal;

  constructor(private auth: AuthService) {
    this.profits = new Array<Profit>();
    this.auth.profits();
  }

  

  ngOnInit() {
    this.getProfitsSubscription = this.auth.getProfitsSubject.subscribe({
      next: (res) => {
        if(!res.error) {
          this.profits = <Array<Profit>>res;

          console.log(res.length-1)
          this.horizontal_bar[0].value = res[res.length-1].expenses;
          this.horizontal_bar[1].value = res[res.length-1].revenue;

          for(let i = 0; i < res.length; i++) {
            this.line[0].series.push({
              name: res[i].week,
              value: res[i].profit
            });
          }

          console.log(this.horizontal_bar);
          console.log(this.line);
          this.loading = false;

        } console.log(res);
      }
    });
  }
  ngOnDestroy() {
    if(this.getProfitsSubscription) this.getProfitsSubscription.unsubscribe();
  }

}
interface Profit {
  "expenses": number,
  "profit": number,
  "revenue": number,
  "week": string
}