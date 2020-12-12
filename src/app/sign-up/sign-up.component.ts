import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

//services
import { AuthService } from '../services/auth.service';


//interfaces
import { Admin } from '../interfaces/admin.interface';
import { Customer } from '../interfaces/customer.interface';
import { Employee } from '../interfaces/employee.interface';

//data pack
import { day, month, year } from 'src/assets/data/dates';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  year = year;
  month = month;
  day = day;

  user: Customer = {
    id: null,

    email: null,
    name: null,
    surname: null,

    gender: 'male',
    dateOfBirth: null,

    allergens: null,

    phoneNumber: null,
    address: null,

    createdAt: null,
  }

  password: string;
  confirm_password: string;

  year_selected: number = 0;
  month_selected: number = 0;
  day_selected: number = 0;

  registerSubscription: Subscription;
  
  constructor(private router: Router,
    private authService: AuthService) {}

  ngOnInit() {
    this.registerSubscription = this.authService.registerSubject.subscribe({
      next: (res) => {
        if(!res.error) {

          console.log('success!', res);

          this.authService.token          = res.tokens.access_token;
          this.authService.refresh_token  = res.tokens.refresh_token;

          //dependent on which kind of user it is, set the appropriate variable: admin, employee, customer
          if(!res.admin)    this.authService.admin    = <Admin>res.admin;
          if(!res.employee) this.authService.employee = <Employee>res.employee;
          if(!res.customer) this.authService.customer = <Customer>res.customer;

          this.router.navigate(['/login']);

        } else console.log('error', res.error);
      }
    })
  }
  ngOnDestroy() {
    if(this.registerSubscription) this.registerSubscription.unsubscribe();
  }

  register() {
    try {
      var dateOfBirth = 
      ((this.year_selected+1918)).toString() 
      + '-' +
      (this.month_selected+1 > 10 ? this.month_selected+1 : '0'+(this.month_selected+1)).toString()
      + '-' +
      (this.day_selected+1 > 10 ? this.day_selected+1 : '0'+(this.day_selected+1)).toString()
      + 'T00:00:00Z';

    } catch (e) { console.log(e); }
  
    if(this.password != this.confirm_password) {
      
      console.log('passwords do not match');


    } else 
      this.authService.register(
        this.user.email,
        this.password,
        this.user.name,
        this.user.surname,
        this.user.address,
        this.user.phoneNumber,
        this.user.gender,
        dateOfBirth,
        this.user.allergens
      );



  }

}
