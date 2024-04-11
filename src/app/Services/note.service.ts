import { Note } from '../Models/note.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/envirnoment';
import { Injectable } from '@angular/core';

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
}
