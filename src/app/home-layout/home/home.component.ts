import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

//services
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  logoutSubscription: Subscription;

  constructor(private router: Router,
    public authService: AuthService) {}

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
