import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Employee } from '../Models/employee';
import { EmployeeService } from '../Services/employee.service';

@Component({
  selector: 'app-chef-departement-dashboard',
  templateUrl: './chef-departement-dashboard.component.html',
  styleUrl: './chef-departement-dashboard.component.scss'
})

export class ChefDepartementDashboardComponent {

  empDetail !: FormGroup;
  empObj : Employee = new Employee();
  empList : Employee[] = [];

  addEmpURL : string;
  getEmpURL : string;
  updateEmpUrl : string;
  deleteEmpUrl : string;

  constructor(private formBuilder : FormBuilder, private empService : EmployeeService) { 
    this.addEmpURL = 'http://localhost:9091/emp/addChefDepartement';
    this.getEmpURL = 'http://localhost:9091/emp/getAllChefDepartement';
    this.updateEmpUrl = 'http://localhost:9091/emp/updateChefDepartement';
    this.deleteEmpUrl = 'http://localhost:9091/emp/deleteChefDepartementById';
  }

  ngOnInit(): void {

    this.getAllEmployee();

    this.empDetail = this.formBuilder.group({
      firstname : [''],
      lastname: [''],
      email: [''],
      login : [''],
      password : ['']
    });    

  }

  addEmployee() {
    console.log(this.empDetail);
    this.empObj.firstname = this.empDetail.value.firstname;
    this.empObj.lastname = this.empDetail.value.lastname;
    this.empObj.email = this.empDetail.value.email;
    this.empObj.login = this.empDetail.value.login;
    this.empObj.password = this.empDetail.value.password;

    this.empService.addEmployee(this.empObj,this.addEmpURL).subscribe(res=>{
        console.log(res);
        this.getAllEmployee();
    },err=>{
        console.log(err);
    });

  }

  getAllEmployee() {
    this.empService.getAllEmployee(this.getEmpURL).subscribe(res=>{
        this.empList = res;
    },err=>{
      console.log("error while fetching data.")
    });
  }

  editEmployee(emp : Employee) {
    this.empDetail.controls['firstname'].setValue(emp.firstname);
    this.empDetail.controls['lastname'].setValue(emp.lastname);
    this.empDetail.controls['email'].setValue(emp.email);
    this.empDetail.controls['login'].setValue(emp.login);
    this.empDetail.controls['password'].setValue(emp.password);
  }

  updateEmployee() {

    this.empObj.firstname = this.empDetail.value.firstname;
    this.empObj.lastname = this.empDetail.value.lastname;
    this.empObj.email = this.empDetail.value.email;
    this.empObj.login = this.empDetail.value.login;
    this.empObj.password = this.empDetail.value.password;

    this.empService.updateEmployee(this.empObj,this.updateEmpUrl).subscribe(res=>{
      console.log(res);
      this.getAllEmployee();
    },err=>{
      console.log(err);
    })

  }

  deleteEmployee(emp : Employee) {

    this.empService.deleteEmployee(emp,this.deleteEmpUrl).subscribe(res=>{
      console.log(res);
      alert('Employee deleted successfully');
      this.getAllEmployee();
    },err => {
      console.log(err);
    });

  }
}

