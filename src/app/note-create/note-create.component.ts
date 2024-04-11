import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Etudiant } from '../Models/etudiant.model';
import { Matiere } from '../Models/matiere.model';
import { Note } from '../Models/note.model';
import { TypeNote } from '../Models/enums';
import { EtudiantService } from '../Services/etudiant.service';
import { MatiereServService } from '../Services/matiere-serv.service';
import { NoteService } from '../Services/note.service';
import { switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrl: './note-create.component.scss'
})
export class NoteCreateComponent {
  form!: FormGroup;
  etudiants: Etudiant[] = [];
  matieres: Matiere[] = [];

  Test: TypeNote = TypeNote.Test;
  Ds: TypeNote = TypeNote.Ds;
  Examen: TypeNote = TypeNote.Examen;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private etudiantService: EtudiantService,
    private matiereService: MatiereServService,
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      type: [''],
      note: [''],
      matiere: [''],
      etudiant: ['']
    });

    this.loadEtudiants();
    this.loadMatieres();
  }

  loadEtudiants(): void {
    this.etudiantService.getAllEtudiants().subscribe(etudiants => {
      this.etudiants = etudiants;
    });
  }

  loadMatieres(): void {
    this.matiereService.getallmatieres().subscribe(matieres => {
      this.matieres = matieres;
    });
  }

  addNote(): void {
    let note : Note = new Note();
    note.type=this.form.controls['type'].value;
    note.note=this.form.controls['note'].value;
    this.noteService.addNote(note).pipe(
      switchMap((newNote) => {
        // You may need to implement addNoteToMatiere and addNoteToEtudiant methods in your services
        const matiereId = this.form.get('matiere')?.value;
        const etudiantId = this.form.get('etudiant')?.value;
        const addMat$ = this.noteService.addMatiereToNote(newNote.id, matiereId);
        const addEtd$ = this.noteService.addEtudiantToNote(newNote.id, etudiantId);
        return forkJoin([addMat$, addEtd$]);
      })
    ).subscribe(() => {
      this.router.navigate(['/listeNotes']);
    }, error => {
      console.error('Error adding note:', error);
    });
  }
}
