import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Matiere } from '../Models/matiere.model';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../environment/envirnoment';

@Injectable({
  providedIn: 'root'
})
export class MatiereServService {

  constructor(private http:HttpClient) { }
  addmatiere(cls: Matiere):Observable<Matiere> {
    return this.http.post<Matiere>(environment.host+"/addMatiere/",cls).pipe(
      catchError(error => {
        alert("Une erreur s'est produite lors de l'ajout de la matière: " + error.error);
        return throwError(error);
      })
    );
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
  addmatieremodule(idmat: number, id:number):Observable<void>{
    return this.http.put<void>(environment.host + "/addModuleMatiere/" + idmat + "/" + id, {});
  }
  getMatiereByMod(idMOD: number):Observable<Matiere[]>{
    return this.http.get<Matiere[]>(environment.host+"/getMatiereByMod/" + idMOD)
  }
}
