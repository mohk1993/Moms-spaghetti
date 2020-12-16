import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/interfaces/employee.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnDestroy {

  getEmployeesSubscription: Subscription;

  employees: Array<Employee>;

  constructor(private router: Router,
    private auth: AuthService) {
    
    this.employees = new Array<Employee>();
    this.auth.getEmployees();
  }
  ngOnInit() {
    this.getEmployeesSubscription = this.auth.getEmployeesSubject.subscribe({
      next: (res) => {
        if(!res.error) {
          console.log(res);
          this.employees = res;
          this.employees.push()

        } else console.log(res);
      }
    });
  }
  ngOnDestroy() {
    if(this.getEmployeesSubscription) this.getEmployeesSubscription.unsubscribe();
  }

  checkEmployee(i: number) {
    this.router.navigate(['/employees/single'], { queryParams: { employee_id: this.employees[i].id.toString() }});
  }
  createEmployee() {
    this.router.navigate(['/employees/create']);
  }

}
