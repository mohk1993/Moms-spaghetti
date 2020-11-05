import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent {

  constructor(private router: Router) {}


  home() { this.router.navigate(['/']); }
  reservation() { this.router.navigate(['/reservations/single']); }
}
