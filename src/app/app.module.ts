import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {MatSnackBarModule} from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StandardInterceptor } from './interceptor';
import { dishServices } from './services/dish.service';
import { OrderService } from './services/order.service';
import { DeliveryService } from './services/delivery.service';
import { ReservationService } from './services/reservation.service';
import { reviewService } from './services/review.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    MatSnackBarModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: StandardInterceptor,
      multi: true
    },
    AuthService,
    dishServices,
    OrderService,
    DeliveryService,
    ReservationService,
    reviewService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
