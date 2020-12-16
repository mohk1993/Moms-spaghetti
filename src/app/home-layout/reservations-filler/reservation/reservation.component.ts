import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Reservation } from 'src/app/interfaces/reservation.interface';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit, OnDestroy {

  reservationID: string;
  reservation: Reservation = {
    "id": null,
    "orderId": null,
    "reviewId": null,
    "calendarUuid": null,
    "customerId": null,

    "comment": null,
    "numberOfPeople": 1,
    "specialOccasion": false,

    "startTime": new Date(),
    "endTime": new Date(),

    "createdAt": null
  };

  getReservationSubscription: Subscription;

  displayEndDate: boolean;
  constructor(private readonly route:ActivatedRoute, private router: Router,
    private reservationService: ReservationService) {
    
      this.route.queryParams.subscribe(params => {
        this.reservationID = params['reservation_id'];
        if(this.reservationID == null) this.router.navigate(['/reservations'])
        else {
          this.reservationService.getReservation(this.reservationID);
        }
      });

  }

  ngOnInit() {
    this.getReservationSubscription = this.reservationService.getReservationSubject.subscribe({
      next: (res) => {
        if(!res.error) {
          this.reservation = <Reservation>res;
          console.log(this.reservation.startTime);
          console.log(this.reservation.endTime);
          this.reservation.startTime = new Date(res.startTime);
          this.reservation.endTime = new Date(res.endTime);
          if(
            this.reservation.startTime.getDate() != this.reservation.endTime.getDate()          ||
            this.reservation.startTime.getMonth() != this.reservation.endTime.getMonth()        ||
            this.reservation.startTime.getFullYear() != this.reservation.endTime.getFullYear()) 
              this.displayEndDate = true;
          else this.displayEndDate = false;
        } console.log(res);
      }
    })
  }
  ngOnDestroy() {
    if(this.getReservationSubscription) this.getReservationSubscription.unsubscribe();
  }

}
