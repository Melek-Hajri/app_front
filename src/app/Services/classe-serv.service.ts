import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { classe } from '../Models/classe.model';
import { Observable, catchError, forkJoin, switchMap, throwError } from 'rxjs';
import { environment } from '../environment/envirnoment';
import { EtudiantService } from './etudiant.service';
import { EmailDonnes } from '../Models/emailDonnes.model';
import { Etudiant } from '../Models/etudiant.model';

@Injectable({
  providedIn: 'root'
})
export class ClasseServService {

  constructor(private http:HttpClient, private  etd:EtudiantService) { }
  addclasse(cls: classe):Observable<classe> {
    return this.http.post<classe>(environment.host+"/addclasse/",cls).pipe(
      catchError(error => {
        alert("Une erreur s'est produite lors de l'ajout de la classe: champs nécessaire " );
        return throwError(error);
      })
    );
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
  sendEmailToStudents(details : EmailDonnes): Observable<string> {
    return this.http.post<string>(environment.host+"/sendMail/", details).pipe(
      catchError(error => {
        console.error("Une erreur s'est produite lors de l'envoi de l'e-mail aux étudiants : ", error);
        return throwError(error);
      })
    );
  }
  updateClasseEtNotifier(id: number, classe: classe): Observable<String[]> {
    return this.updateclasse(id, classe).pipe(
      switchMap(updatedClasse => {
        return this.etd.afficherEtudiantsClasse(id).pipe(
          switchMap((students: Etudiant[]) => {
            const sendEmailObservables: Observable<string>[] = [];
            for (let i = 0; i < students.length; i++) {
              const emailDetails: EmailDonnes = {
                recipient: students[i].email,
                msgBody: 'Une Update du classe a été faite Merci de consulter Notre Plateforme',
                subject: 'Sujet de l\'e-mail : Une Nouvelle Mise à jour'
              };
              const sendEmailObservable = this.sendEmailToStudents(emailDetails);
              sendEmailObservables.push(sendEmailObservable);
            }
            // Utiliser forkJoin pour attendre que tous les e-mails soient envoyés
            return forkJoin(sendEmailObservables);
          }),
          catchError(error => {
            console.error("Une erreur s'est produite lors de la récupération des étudiants de la classe : ", error);
            return throwError(error);
          })
        );
      }),
      catchError(error => {
        console.error("Une erreur s'est produite lors de la mise à jour de la classe : ", error);
        return throwError(error);
      })
    );
  }
}
