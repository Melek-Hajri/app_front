import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Matiere } from '../Models/matiere.model';
import { Observable } from 'rxjs';
import { environment } from '../environment/envirnoment';

@Injectable({
  providedIn: 'root'
})
export class MatiereServService {

  constructor(private http:HttpClient) { }
  addmatiere(cls: Matiere):Observable<Matiere> {
    return this.http.post<Matiere>(environment.host+"/addMatiere/",cls)
   }
   addListmatieres(cls: Matiere[]): Observable<Matiere[]> {
    return this.http.post<Matiere[]>(environment.host+"/addlistMatieres/",cls)
   }
   updatematiere(id:number,usr:Matiere):Observable<Matiere>{
    return this.http.put<Matiere>(environment.host+"/UpdateMatiere/"+id,usr)
  }
  deletematiere(id:number):Observable<Matiere>{
    return this.http.delete<Matiere>(environment.host+"/Deletematiere/"+id)
  }
  getallmatieres():Observable<Matiere[]>{
    return this.http.get<Matiere[]>(environment.host+"/getAllMatieres/")

  }
  getmatierebyid(id:number):Observable<Matiere>{
    return this.http.get<Matiere>(environment.host+"/getMatiereByID/"+id)
  }
}
