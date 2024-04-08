import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { classe } from '../Models/classe.model';
import { Observable } from 'rxjs';
import { environment } from '../environment/envirnoment';

@Injectable({
  providedIn: 'root'
})
export class ClasseServService {

  constructor(private http:HttpClient) { }
  addclasse(cls: classe):Observable<classe> {
    return this.http.post<classe>(environment.host+"/addclasse/",cls)
   }
   addListclasse(cls: classe[]): Observable<classe[]> {
    return this.http.post<classe[]>(environment.host+"/addlistclasse/",cls)
   }
   updateclasse(id:number,usr:classe):Observable<classe>{
    return this.http.put<classe>(environment.host+"/UpdateClasse/"+id,usr)
  }
  deleteclasse(id:number):Observable<classe>{
    return this.http.delete<classe>(environment.host+"/DeleteClasse/"+id)
  }
  getallclasses():Observable<classe[]>{
    return this.http.get<classe[]>(environment.host+"/getAllClasses/")

  }
  getclassebyid(id:number):Observable<classe>{
    return this.http.get<classe>(environment.host+"/getClasseByID/"+id)
  }
  
}
