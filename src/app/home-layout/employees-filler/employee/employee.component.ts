import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/interfaces/employee.interface';
import { AuthService } from 'src/app/services/auth.service';
import { day, month, year } from 'src/assets/data/dates';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, OnDestroy {


  year = year;
  month = month;
  day = day;

  employee: Employee = {
    id: null,

    email: null,
    name: null,
    surname: null,

    phoneNumber: null,
    address: null,

    dateOfBirth: null,


    bankAccount: null,
    salary: null,
    workload: 1,

    createdAt: null,
  }

  password: string;
  confirm_password: string;

  year_selected: number = 0;
  month_selected: number = 0;
  day_selected: number = 0;

  createEmplyeeSubscription: Subscription;

  constructor(private router: Router, 
    private authService: AuthService) {


    }

  ngOnInit() {
    this.createEmplyeeSubscription = this.authService.registerEmployeeSubject.subscribe({
      next: (res) => {
        if(!res.error) {
          console.log(res);

          this.router.navigate(['/employees']);


        } else console.log('error', res);
      }
    });
  }
  ngOnDestroy() {
    if(this.createEmplyeeSubscription) this.createEmplyeeSubscription.unsubscribe();
  }

  create() {
    try {
      var dateOfBirth = 
      (this.year_selected+1918).toString() 
      + '-' +
      (this.month_selected+1 > 10 ? this.month_selected+1 : '0'+(this.month_selected+1)).toString()
      + '-' +
      (this.day_selected+1 > 10 ? this.day_selected+1 : '0'+(this.day_selected+1)).toString()
      + 'T00:00:00Z';

    } catch (e) { console.log(e); }

    if(this.password != this.confirm_password) {
      
      console.log('passwords do not match');
    } else 
      this.authService.register_employee(
        this.employee.email,
        this.password,
        this.employee.name,
        this.employee.surname,
        this.employee.address,
        this.employee.phoneNumber,
        dateOfBirth,
        this.employee.salary,
        this.employee.workload,
        this.employee.bankAccount
      );
  }

}
