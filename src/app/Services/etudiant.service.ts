import { Injectable } from '@angular/core';
import { Etudiant } from '../Models/etudiant.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/envirnoment';


@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  constructor(private http: HttpClient) {}

  addEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    return this.http.post<Etudiant>(environment.host+"/addEtudiant", etudiant);
  }

  addListEtudiant(etudiants: Etudiant[]): Observable<Etudiant[]> {
    return this.http.post<Etudiant[]>(environment.host + "/addListEtudiant", etudiants);
  }

  getEtudiant(id: number): Observable<Etudiant> {
    return this.http.get<Etudiant>(environment.host + "/getEtudiant/" + id);
  }

  deleteEtudiant(id: number): Observable<void> {
    return this.http.delete<void>(environment.host + "/deleteEtudiant/" + id);
  }

  getAllEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(environment.host + "/getAllEtudiants");
  }

  updateEtudiant(id: number, updatedEtudiant: Etudiant): Observable<void> {
    return this.http.put<void>(environment.host + "/updateEtudiant/" + id, updatedEtudiant);
  }

  affecterEtudiantClasse(idETD: number, idCLASSE: number): Observable<void> {
    return this.http.put<void>(environment.host + "/affecterEtudiantClasse/" + idETD + "/" + idCLASSE, {});
  }

  afficherEtudiantsClasse(idCLASSE: number): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(environment.host + "/afficherEtudiantsClasse/" + idCLASSE);
  }
}
