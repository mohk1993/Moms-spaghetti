import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Reservation } from 'src/app/interfaces/reservation.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit, OnDestroy {

  reservationID:string;

  reservations: Array<Reservation>;

  getReservationsSubscription: Subscription;
  deleteReservationSubscription: Subscription;

  constructor(private router: Router,
    public auth: AuthService,
    private reservationService: ReservationService
    ) {
      this.reservations = new Array<Reservation>();
      this.reservationService.getReservations();
  }

  ngOnInit() {
    this.getReservationsSubscription = this.reservationService.getReservationsSubject.subscribe({
      next: (res) => {
        if(!res.error) {

          console.log(res);
          this.reservations = <Array<Reservation>>res;

        } else console.log(res);
      }
    });
    this.deleteReservationSubscription = this.reservationService.deleteReservationSubject.subscribe({
      next: (res) => {
        console.log(res);
        this.reservationService.getReservations();
      }
    });
  }
  ngOnDestroy() {
    if(this.getReservationsSubscription) this.getReservationsSubscription.unsubscribe();
    if(this.deleteReservationSubscription) this.deleteReservationSubscription.unsubscribe();
  }

  createReservation() {
    this.router.navigate(['/reservations/create']);
  }
  goToReservation(i: number, target: string) {
    if(target != 'action') {
      console.log(this.auth.customer);
      if(this.auth.customer) this.router.navigate(['/reservations/create'], { queryParams: { reservation_id: this.reservations[i].id.toString() } });
      else this.router.navigate(['/reservations/single'], { queryParams: { reservation_id: this.reservations[i].id.toString() } });
    }
  }
  removeReservation(i: number) {
    console.log(this.reservations[i].startTime);
    let time = new Date(this.reservations[i].startTime).toTimeString() + ' - \n' + new Date(this.reservations[i].endTime).toTimeString()
    if(confirm("Are you sure you want to delete reservation \n" + time + '?'))
      this.reservationService.deleteReservation(this.reservations[i].id.toString());
  }
}
