import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/interfaces/employee.interface';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-single-employee',
  templateUrl: './single-employee.component.html',
  styleUrls: ['./single-employee.component.scss']
})
export class SingleEmployeeComponent implements OnInit, OnDestroy {


  employeeID: string;


  employee: Employee = {
    id: null,

    email: null,
    name: null,
    surname: null,

    phoneNumber: null,
    address: null,

    dateOfBirth: new Date(),


    bankAccount: null,
    salary: null,
    workload: null,

    createdAt: null,
  }
  getEmployeeSuibscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute,
    private authService: AuthService) {
      this.route.queryParams.subscribe(params => {
        this.employeeID = params['employee_id'];
        if(this.employeeID == null) this.router.navigate(['employees']);
        else this.authService.getEmployee(this.employeeID)
      });
    }

  ngOnInit() {
    this.getEmployeeSuibscription = this.authService.getEmployeeSubject.subscribe({
      next: (res) => {
        if(!res.error) {

          console.log(res);
          this.employee = <Employee>res;

        } else console.log(res);
      }
    });
  }
  ngOnDestroy() {
    if(this.getEmployeeSuibscription) this.getEmployeeSuibscription.unsubscribe();
  }

}
