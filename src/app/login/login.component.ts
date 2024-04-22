import { Component, OnInit } from '@angular/core';
import { Employee } from '../Models/employee';
import { EmployeeService } from '../Services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit{

  login : string = '';
  password : string = '';
  role : string = '';

  emp : Employee = new Employee();
  roles : string[];

  constructor(private empService : EmployeeService, private router : Router)
  {
    this.roles = ['Admin','ChefDepartement','Agent'];

  }
  ngOnInit(): void {
    this.login = '';
    this.password = '';
  }

  mLogin()
  {
    this.emp.login = this.login;
    this.emp.password = this.password;
    this.emp.role = this.role;

    this.empService.login(this.emp).subscribe(res=>
      {
        if(res == null)
        {
          alert("Username or password or role is wrong");
          this.ngOnInit();
        }
        else
        {
          if(this.role == 'Admin'){
            this.router.navigate(['/admin']);
          }
          else if(this.role == 'ChefDepartement'){
            this.router.navigate(['/listclasses']);
          }
          else if(this.role == 'Agent'){
            this.router.navigate(['/listeEtudiants']);
          }
        }
      },err=>
        {
          alert("Login failed");
          this.ngOnInit();
        }
    )
  }
 
}

