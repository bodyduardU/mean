import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-emplyees-list',
  templateUrl: './emplyees-list.component.html',
  styleUrls: ['./emplyees-list.component.css']
})
export class EmplyeesListComponent implements OnInit{
  employees$: Observable<Employee[]> = new Observable();
  constructor(private employeeService: EmployeeService) {  }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  private fetchEmployees(): void {
    this.employees$ = this.employeeService.getEmployees();
  };
  deleteEmployee(id: string): void{
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => this.fetchEmployees()
    });
  }
}
