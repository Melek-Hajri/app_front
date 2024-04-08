import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Specialite } from '../Models/specialite.model';
import { Observable } from 'rxjs';
import { environment } from '../environment/envirnoment';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteServService {

  constructor(private http:HttpClient) { }
  addspecialite(cls: Specialite):Observable<Specialite> {
    return this.http.post<Specialite>(environment.host+"/addSpecialite/",cls)
   }
   addListspecialites(cls: Specialite[]): Observable<Specialite[]> {
    return this.http.post<Specialite[]>(environment.host+"/addlistSpecailites/",cls)
   }
   updateSpecialite(id:number,usr:Specialite):Observable<Specialite>{
    return this.http.put<Specialite>(environment.host+"/UpdateSpecialite/"+id,usr)
  }
  deleteSpecialite(id:number):Observable<Specialite>{
    return this.http.delete<Specialite>(environment.host+"/DeleteSpecialite/"+id)
  }
  getallSpecialites():Observable<Specialite[]>{
    return this.http.get<Specialite[]>(environment.host+"/getAllSpecialites/")

  }
  getSpecialitebyid(id:number):Observable<Specialite>{
    return this.http.get<Specialite>(environment.host+"/getSpecialiteByID/"+id)
  }
}

