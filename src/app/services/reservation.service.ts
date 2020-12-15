import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Reservation } from "../interfaces/reservation.interface";

@Injectable()
export class ReservationService {

    constructor(private http: HttpClient) {
        environment.key
    }

    getReservationsSubject = new Subject<any>();
    getReservationSubject = new Subject<any>();
    
    postReservationSubject     = new Subject<any>();
    putReservationSubject      = new Subject<any>();
    deleteReservationSubject   = new Subject<any>();


    getReservations() {
        this.http.get(environment.key + 'reservations').subscribe({
            next: (res) => { this.getReservationsSubject.next(res);   },
            error:  (e) => { this.getReservationsSubject.next(e);     }
        });
    }
    getReservation(id: string) {
        this.http.get(environment.key + 'reservations/' + id).subscribe({
            next: (res) => { this.getReservationSubject.next(res);   },
            error:  (e) => { this.getReservationSubject.next(e);     }
        });
    }


    postReservation(reservation: Reservation) {
        this.http.post(environment.key + 'reservations', reservation).subscribe({
            next: (res) => { this.postReservationSubject.next(res);   },
            error:  (e) => { this.postReservationSubject.next(e);     }
        });
    }
    putReservation(id: string, reservation: Reservation) {
        this.http.put(environment.key + 'reservations/' + id, reservation).subscribe({
            next: (res) => { this.putReservationSubject.next(res);   },
            error:  (e) => { this.putReservationSubject.next(e);     }
        });
    }
    deleteReservation(id: string) {
        this.http.delete(environment.key + 'reservations/' + id).subscribe({
            next: (res) => { this.deleteReservationSubject.next(res);   },
            error:  (e) => { this.deleteReservationSubject.next(e);     }
        });
    }




}