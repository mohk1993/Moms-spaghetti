import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit, OnDestroy {

  constructor(private router: Router, public authService: AuthService) {}

  logoutSubscription: Subscription;

  ngOnInit() {
    this.logoutSubscription = this.authService.logoutSubject.subscribe({
      next: (res) => {
        if(res.error) {

          this.authService.token          = null;
          this.authService.refresh_token  = null;
          this.authService.admin          = null;
          this.authService.employee       = null;
          this.authService.customer       = null;

          this.router.navigate(['/login']);

        } else console.log('error while logout!');
      }
    });
  }
  ngOnDestroy() {
    if(this.logoutSubscription) this.logoutSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

}
