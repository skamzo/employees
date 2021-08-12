import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})
export class EmployeeHomeComponent implements OnInit {

  formValue!: FormGroup;

  employee: Employee = new Employee();

  employeeData: any

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name : [''],
      email : [''],
      salary : ['']
    })

    this.getAllEmployees();
  }

  postEmployeeDetails() {
    this.employee.name = this.formValue.value.name;
    this.employee.email = this.formValue.value.email;
    this.employee.salary = this.formValue.value.salary;

    this.employeeService.postEmployee(this.employee)
        .subscribe(res => {
          console.log(res);
          alert("Employee added successfully")
          this.getAllEmployees();
        }, 
        error =>{
          alert("Something went wrong")
        })
  }

  getAllEmployees() {
    this.employeeService.getEmployee()
        .subscribe(res =>{
          this.employeeData = res;
        })
  }

  deleteEmployee(row: any) {
    this.employeeService.deleteEmployee(row.id)
        .subscribe(res =>{
           alert("employee deteted");
        })
  }

  onEdit(row: any) {
    this.employee.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['salary'].setValue(row.salary);
}

updateEmployeeDetails() {
  this.employee.name = this.formValue.value.name;
  this.employee.email = this.formValue.value.email;
  this.employee.salary = this.formValue.value.salary;

  this.employeeService.updateEmployee(this.employee, this.employee.id)
       .subscribe(res => {
          alert("Updated Successfully");
       })
}

}
