import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { module } from '../Models/module.model';
import { Observable } from 'rxjs';
import { environment } from '../environment/envirnoment';


@Injectable({
  providedIn: 'root'
})
export class ModuleServService {
  constructor(private http:HttpClient) { }
  addmodule(cls: module):Observable<module> {
    return this.http.post<module>(environment.host+"/addModule/",cls)
   }
   addListmodules(cls: module[]): Observable<module[]> {
    return this.http.post<module[]>(environment.host+"/addlistModules/",cls)
   }
   updatemodule(id:number,usr:module):Observable<module>{
    return this.http.put<module>(environment.host+"/UpdateModule/"+id,usr)
  }
  deletemodule(id:number):Observable<module>{
    return this.http.delete<module>(environment.host+"/DeleteModule/"+id)
  }
  getallmodules():Observable<module[]>{
    return this.http.get<module[]>(environment.host+"/getAllModules/")

  }
  getmodulebyid(id:number):Observable<module>{
    return this.http.get<module>(environment.host+"/getModuleByID/"+id)
  }
}
