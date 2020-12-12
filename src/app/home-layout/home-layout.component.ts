import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

//  Interfaces 
import { Admin } from '../interfaces/admin.interface';
import { Customer } from '../interfaces/customer.interface';
import { Employee } from '../interfaces/employee.interface';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit, OnDestroy {

  timer;

  constructor(private router: Router, public authService: AuthService) {
    let token = localStorage.getItem('refreshToken');
    if((token)) {
      if(!this.authService.admin && !this.authService.employee && !this.authService.customer)
        this.authService.refreshSession(token);
      else
        this.timer = setInterval(() => {
          token = localStorage.getItem('refreshToken');
          this.authService.refreshSession(token)
        }, 5 * 60 * 1000);
    }else this.router.navigate(['/login'])
  }

  logoutSubscription: Subscription;
  refreshSubscription: Subscription;

  ngOnInit() {
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

          this.timer = setInterval(() => {
            let token = localStorage.getItem('refreshToken');
            this.authService.refreshSession(token)
          }, 5 * 60 * 1000);

        }else{
          console.log('error happened: -', res.error);
        }
      }
    });

    this.logoutSubscription = this.authService.logoutSubject.subscribe({
      next: (res) => {
        
        this.authService.token          = null;
        this.authService.refresh_token  = null;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.authService.admin          = null;
        this.authService.employee       = null;
        this.authService.customer       = null;

        this.router.navigate(['/login']);
      }
    });
  }
  ngOnDestroy() {
    if(this.logoutSubscription) this.logoutSubscription.unsubscribe();
    if(this.refreshSubscription) this.refreshSubscription.unsubscribe();
    clearInterval(this.timer);
  }

  logout() {
    this.authService.logout();
  }

}
