import { TypeScriptEmitter } from '@angular/compiler';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Reservation } from 'src/app/interfaces/reservation.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent implements OnInit, OnDestroy {

  reservationID: string;
  orderID: string;
  reservation: Reservation = {
    "id": null,
    "orderId": null,
    "reviewId": null,
    "calendarUuid": null,
    "customerId": this.auth.customer ? this.auth.customer.id : null, //this.router.navigate(['/']) as undefined, 

    "comment": null,
    "numberOfPeople": 1,
    "specialOccasion": false,

    "startTime": new Date(),
    "endTime": new Date(),

    "createdAt": null
  };

  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;

  getReservationSubscription: Subscription;
  postReservationSubscription: Subscription;
  putReservationSubscription: Subscription;

  constructor(private readonly route:ActivatedRoute, private router: Router,
    private readonly auth: AuthService,
    private reservationService: ReservationService) {
      
      let year = new Date().getFullYear().toString();
      year += '-';
      year += (new Date().getMonth() + 1) > 10 ? (new Date().getMonth() + 1).toString() : '0'+(new Date().getMonth() + 1).toString(); 
      year += '-';
      year += new Date().getDate() > 10 ? new Date().getDate().toString() : "0"+new Date().getDate().toString();

      let time = new Date().getHours() > 10 ? new Date().getHours().toString() : "0"+new Date().getHours().toString();
      time += ":"
      time+= new Date().getMinutes() > 10 ? new Date().getMinutes().toString() : '0'+new Date().getMinutes().toString();

      this.startDate = year.toString();
      this.startTime = time.toString();
      this.endDate = year.toString();
      this.endTime = time.toString();



    this.route.queryParams.subscribe(params => {
      this.reservationID = params['reservation_id'];
      this.orderID = params['order_id'];
      if(this.reservationID == null) {
        this.create = true;
        if(this.orderID == null) {
          let id: string  = null; 
          id = this.router.url.substring(this.router.url.lastIndexOf('/')+1);
          
          console.log(id);
          if(id.indexOf('create') != -1) id = id.substring(id.indexOf('create')+6);
          if(id.lastIndexOf('=') != -1) id = id.substring(id.lastIndexOf('=')+1);
          console.log(id);
          if(id != null && id != '') {
            this.reservationService.getReservation(id);
            this.reservationID = id;
            this.create = false;
          }
        } else try {
          this.reservation.orderId = parseInt(this.orderID); 
        } catch(e) {
          console.log(e);
        }
      }
      else {
        this.create = false;
        this.reservationService.getReservation(this.reservationID);
      }
    });
    
  }
  create: boolean = true;
  ngOnInit() {
    this.postReservationSubscription = this.reservationService.postReservationSubject.subscribe({
      next: (res) => {
        if(!res.error) {

          console.log(res);
          switch(this.state) {
            case 'order':
              this.router.navigate(['/orders/create'], { queryParams: { reservation_id: res.id }});
              break;
            case 'reservation':
              this.router.navigate(['/reservations']);
              break;
          }

        } else console.log(res);
      }
    });
    this.getReservationSubscription = this.reservationService.getReservationSubject.subscribe({
      next: (res) => {
        if(!res.error) {

          console.log(res);
          this.reservation = <Reservation>res;
          this.startDate = this.reservation.startTime.toString().split('T')[0];
          this.startTime = this.reservation.startTime.toString().split('T')[1].split('Z')[0].substring(0, 5);
          this.endDate = this.reservation.endTime.toString().split('T')[0];
          this.endTime = this.reservation.endTime.toString().split('T')[1].split('Z')[0].substring(0, 5);

        } else {
          console.log(res);
          this.router.navigate(['/reservations']);
        }
      }
    });
    this.putReservationSubscription = this.reservationService.putReservationSubject.subscribe({
      next: (res) => {
        if(!res.error) {
            
          console.log(res);
          this.reservationService.getReservation(this.reservationID);
          this.router.navigate(['/reservations']);

        } else console.log(res);
      }
    });
  }
  ngOnDestroy() {
    if(this.getReservationSubscription) this.getReservationSubscription.unsubscribe();
    if(this.postReservationSubscription) this.postReservationSubscription.unsubscribe();
    if(this.putReservationSubscription) this.putReservationSubscription.unsubscribe();
  }
  state: string;
  createReservation(state: string) {

    this.reservation.startTime = new Date(this.startDate+"T"+this.startTime+":00");
    this.reservation.endTime = new Date(this.endDate+"T"+this.endTime+":00");

    this.state = state;
    this.reservationService.postReservation(this.reservation);
  }
  updateReservation(state: string) {
    this.reservation.startTime = new Date(this.startDate+"T"+this.startTime+":00");
    this.reservation.endTime = new Date(this.endDate+"T"+this.endTime+":00");

    this.state = state;
    this.reservationService.putReservation(this.reservationID, this.reservation);
  }
  getReservation() {
    if(!this.create) window.open('https://moms-spaghetti.herokuapp.com/api/v1/calendars/' + this.reservation.calendarUuid,'popUpWindow','height=400,width=600,left=10,top=10,,scrollbars=yes,menubar=no')
  }


  changeOccasion() {
    this.reservation.specialOccasion = !this.reservation.specialOccasion;
  }
  noLower(e) { 
    if(!e.srcElement.value) e.srcElement.value = 1; 
    else if(e.srcElement.value as number >= 99) e.srcElement.value = 99; 
  }

}
