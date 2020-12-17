import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from '../interfaces/admin.interface';
import { Customer } from '../interfaces/customer.interface';
import { Employee } from '../interfaces/employee.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  }
})
export class LoginComponent implements OnInit, OnDestroy {
  
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == 'Enter')
      this.login();
  }

  timer;
  refreshSubscription: Subscription;
  constructor(private router: Router, private authService: AuthService) {
    //some code here 

    let token = localStorage.getItem('refreshToken');
    if((token)) {
      if(!this.authService.admin && !this.authService.employee && !this.authService.customer)
        this.authService.refreshSession(token);
      else
        this.timer = setInterval(() => {
          token = localStorage.getItem('refreshToken');
          this.authService.refreshSession(token)
        }, 5 * 60 * 1000);
    }
  }

  user: {
    email: string,
    password: string
  } = {
    email: null,
    password: null
  }

  loginSubscription: Subscription;

  ngOnInit() {
    this.loginSubscription = this.authService.loginSubject.subscribe({
      next: (res) => {
        console.log(res);
        if(!res.error) {


          this.authService.token          = res.tokens.access_token;
          this.authService.refresh_token  = res.tokens.refresh_token;

          localStorage.setItem('refreshToken', res.tokens.refresh_token as string);
          localStorage.setItem('accessToken', res.tokens.access_token as string);

          //dependent on which kind of user it is, set the appropriate variable: admin, employee, customer
          if(res.admin)    this.authService.admin    = <Admin>res.admin;
          if(res.employee) this.authService.employee = <Employee>res.employee;
          if(res.customer) this.authService.customer = <Customer>res.customer;

          this.router.navigate(['/']);

        } else console.log('error happened: -', res.error);
        
      }
    });
    this.refreshSubscription = this.authService.refreshSessionSubject.subscribe({
      next: (res) => {
        if(!res.error){
          
          this.authService.token          = res.tokens.access_token;
          this.authService.refresh_token  = res.tokens.refresh_token;

          localStorage.setItem('refreshToken', res.tokens.refresh_token as string);
          localStorage.setItem('accessToken', res.tokens.access_token as string);

          //dependent on which kind of user it is, set the appropriate variable: admin, employee, customer
          if(res.admin)    this.authService.admin    = <Admin>res.admin;
          if(res.employee) this.authService.employee = <Employee>res.employee;
          if(res.customer) this.authService.customer = <Customer>res.customer;

          this.router.navigate(['/']);

        } else console.log('error happened: -', res.error);
      }
    });
  }

  ngOnDestroy() {
    if(this.loginSubscription) this.loginSubscription.unsubscribe();
    if(this.refreshSubscription) this.refreshSubscription.unsubscribe();
    clearInterval(this.timer);
  }


  login() {
    this.authService.login(this.user.email, this.user.password);
  }
}
