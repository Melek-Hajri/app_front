import { Note } from '../Models/note.model';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin, switchMap, throwError } from 'rxjs';
import { environment } from '../environment/envirnoment';
import { Injectable } from '@angular/core';
import { EmailDonnes } from '../Models/emailDonnes.model';
import { Etudiant } from '../Models/etudiant.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(environment.host + "/addNote", note);
  }

  addListNotes(notes: Note[]): Observable<Note[]> {
    return this.http.post<Note[]>(environment.host + "/addListNotes", notes);
  }

  getNote(id: number): Observable<Note> {
    return this.http.get<Note>(environment.host + "/getNote/" + id);
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(environment.host + "/deleteNote/" + id);
  }

  getAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(environment.host + "/getAllNotes");
  }

  updateNote(id: number, updatedNote: Note): Observable<void> {
    return this.http.put<void>(environment.host + "/updateNote/" + id, updatedNote);
  }

  getNotesByEtudiantMatiere(idETD: number, idMATIERE: number): Observable<Note[]> {
    return this.http.get<Note[]>(environment.host + "/getNotesByEtudiantAndMatiere/" + idETD + "/" + idMATIERE);
  }

  getNotesByEtudiant(idETD: number): Observable<Note[]> {
    return this.http.get<Note[]>(environment.host + "/getNotesByEtudiant/" + idETD );
  }

  getNotesByClasse(idCLASSE: number): Observable<Note[]> {
    return this.http.get<Note[]>(environment.host + "/getNotesByClasse/" + idCLASSE );
  }
  addEtudiantToNote(idNote: number, idEtd: number): Observable<void> {
    return this.http.put<void>(environment.host + "/addEtudiantToNote/" + idNote + "/" + idEtd, {});
  }
  addMatiereToNote(idNote: number, idMat: number): Observable<void> {
    return this.http.put<void>(environment.host + "/addMatiereToNote/" + idNote + "/" + idMat, {});
  }
  sendEmailToStudent(details : EmailDonnes): Observable<string> {
    return this.http.post<string>(environment.host+"/sendMail/", details).pipe(
      catchError(error => {
        console.error("Une erreur s'est produite lors de l'envoi de l'e-mail aux étudiants : ", error);
        return throwError(error);
      })
    );
  }
  updateNoteEtNotifier(id: number, updatedNote: Note): Observable<String> {
    return this.updateNote(id, updatedNote).pipe(
      switchMap(update => {
          const emailDetails: EmailDonnes = {
            recipient: updatedNote.etudiant.email, 
            msgBody: 'Vos notes ont été modifiées, veuillez consulter notre plateforme.',
            subject: 'Mise à jour des notes'
          };
          return this.sendEmailToStudent(emailDetails);
        })
      );
  }
  addNoteEtNotifier(etd: Etudiant): Observable<String> {
    const emailDetails: EmailDonnes = {
      recipient: etd.email, 
      msgBody: 'Une note a été ajouté, veuillez consulter notre plateforme.',
      subject: 'Ajout des notes'
    };
    return this.sendEmailToStudent(emailDetails);
  }
  deleteNoteEtNotifier(etd: Etudiant): Observable<String> {
    const emailDetails: EmailDonnes = {
      recipient: etd.email, 
      msgBody: 'Une note a été supprimé, veuillez consulter notre plateforme.',
      subject: 'Annulation des notes'
    };
    return this.sendEmailToStudent(emailDetails);
  }
}