import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

//services
import { AuthService } from '../services/auth.service';


//interfaces
import { Admin } from '../interfaces/admin.interface';
import { Customer } from '../interfaces/customer.interface';
import { Employee } from '../interfaces/employee.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  year = [
    '1918',
    '1919',
    '1920',
    '1921',
    '1922',
    '1923',
    '1924',
    '1925',
    '1926',
    '1927',
    '1928',
    '1930',
    '1931',
    '1932',
    '1933',
    '1934',
    '1935',
    '1936',
    '1937',
    '1938',
    '1939',
    '1940',
    '1941',
    '1942',
    '1943',
    '1944',
    '1945',
    '1946',
    '1947',
    '1948',
    '1949',
    '1950',
    '1951',
    '1952',
    '1953',
    '1954',
    '1955',
    '1956',
    '1957',
    '1958',
    '1959',
    '1960',
    '1961',
    '1962',
    '1963',
    '1964',
    '1965',
    '1966',
    '1967',
    '1968',
    '1969',
    '1970',
    '1971',
    '1972',
    '1973',
    '1974',
    '1975',
    '1976',
    '1977',
    '1978',
    '1979',
    '1980',
    '1981',
    '1982',
    '1983',
    '1984',
    '1985',
    '1986',
    '1987',
    '1988',
    '1989',
    '1990',
    '1991',
    '1992',
    '1993',
    '1994',
    '1995',
    '1996',
    '1997',
    '1998',
    '1999',
    '2000',
    '2001',
    '2002',
    '2003',
    '2004',
    '2005',
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
  ]
  month = [
    'January',
    'February',
    'March',
    'April',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  day = [ 
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29'],
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
  ]

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
