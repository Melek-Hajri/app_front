import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../Models/employee';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  loginUrl : string;

  constructor(private http : HttpClient,private router:Router) {
    this.loginUrl = 'http://localhost:9091/emp/login';
   }

   addEmployee(emp : Employee,url : string): Observable<Employee> {
     return this.http.post<Employee>(url,emp);
   }

   getAllEmployee(url : string): Observable<Employee[]>{
     return this.http.get<Employee[]>(url);
   }

   updateEmployee(emp :Employee,url : string) : Observable<Employee>{
     return this.http.put<Employee>(url, emp);
   }

   deleteEmployee(emp : Employee,url : string) : Observable<Employee> {
     return this.http.delete<Employee>(url+'/'+emp.login);
   }

   login(emp : Employee):Observable<any>
   {
    return this.http.post<any>(this.loginUrl,emp);
   }
}