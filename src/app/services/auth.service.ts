import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

//models
import { Admin } from '../interfaces/admin.interface';
import { Employee } from '../interfaces/employee.interface';
import { Customer } from '../interfaces/customer.interface';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {}

    token: string;
    refresh_token: string;

    admin: Admin;
    employee: Employee;
    customer: Customer;

    loginSubject    = new Subject<any>();
    logoutSubject   = new Subject<any>();

    registerSubject = new Subject<any>();


    login(email: string, password: string) {
        this.http.post(environment.key + 'session', {
            email: email,
            password: password
        }).subscribe({
            next: (res) => { this.loginSubject.next(res);   },
            error:  (e) => { this.loginSubject.next(e);     }
        });
    }

    logout() {
        this.http.delete(environment.key + 'session').subscribe({
            next: (res) => { this.logoutSubject.next(res); },
            error:  (e) => { this.logoutSubject.next(e); }
        });
    }

    refresh() {

    }

    register(email: string, password: string, name: string, surname: string, address: string, phone: string, gender: string, dateOfBirth: string, allergens: string) {
        this.http.post(environment.key+'customers', {
            email: email,
            password: password,
            name: name,
            surname: surname,
            address: address,
            phoneNumber: phone,
            gender: gender,
            dateOfBirth: dateOfBirth,
            allergens: allergens 
        }).subscribe({
            next: (res) => { this.registerSubject.next(res); },
            error:  (e) => { this.registerSubject.next(e); }
        });
    }

}