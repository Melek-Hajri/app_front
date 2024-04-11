import { Component, OnInit } from '@angular/core';
import { ClasseServService } from '../Services/classe-serv.service';
import { classe } from '../Models/classe.model';
import { Etudiant } from '../Models/etudiant.model';
import { Note } from '../Models/note.model';
import { NoteService } from '../Services/note.service';
import { ModuleServService } from '../Services/module-serv.service';
import { module } from '../Models/module.model';
import { EtudiantService } from '../Services/etudiant.service';
import { Matiere } from '../Models/matiere.model';
import { MatiereServService } from '../Services/matiere-serv.service';
import { TypeNote } from '../Models/enums';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
  form!: FormGroup;
  classes: classe[] = [];
  clsId!: number;
  cls!: classe;
  modules: module[] = [];
  etds: Etudiant[] = [];
  notes: Note[] = [];
  matieres: Matiere[] = [];
  note!: Note;

  Test: TypeNote = TypeNote.Test;
  Ds: TypeNote = TypeNote.Ds;
  Examen: TypeNote = TypeNote.Examen;

  constructor(private clsServ: ClasseServService, private noteServ: NoteService, private modServ: ModuleServService, 
    private etdServ: EtudiantService, private matServ: MatiereServService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      cls: ['']
    });
    this.loadClasses();
  }

  loadClasses(): void {
    this.clsServ.getallclasses().subscribe(classes => {
      this.classes = classes;
    });
  }

  onClassChange(): void {
    this.clsId = this.form.get('cls')?.value;
    if (this.clsId) {
      this.loadData();
    } else {
      this.modules = [];
      this.etds = [];
      this.notes = [];
    }
  }

  loadData(): void {
    this.clsServ.getclassebyid(this.clsId).subscribe(cls=> {
      this.cls = cls;
    });
    this.modules = [];
    this.matieres = [];
    this.modServ.getModuleByClasse(this.clsId).pipe(
      switchMap(modules => {
        const filteredModules = modules.filter(module => module.listeMatieres.length > 0);
        this.modules = filteredModules;
        const matiereRequests = modules.map(module => this.matServ.getMatiereByMod(module.idModule));
        return forkJoin(matiereRequests);
      })
    ).subscribe(matieres => {
      this.matieres = matieres.flat();
    });

    this.etdServ.afficherEtudiantsClasse(this.clsId).subscribe(etds => {
      this.etds = etds;
      console.log(this.etds);
    });
  }

  getNote(etdId: number, matId: number, type: TypeNote): number | null {
    const filteredNotes = this.etds.filter(etd => etd.id === etdId)[0].notes.filter(note => note.matiere.idMatiere === matId && note.type === type);
    if (filteredNotes.length > 0) {
      return filteredNotes[0].note;
    }
    return null;
    // return this.noteServ.getNotesByEtudiant(etdId).pipe(
    //   map(notes => {
    //     this.notes = notes;
    //     console.log(this.notes); // Log the notes after the HTTP request completes
    //     const filteredNotes = this.notes.filter(note => note.matiere.idMatiere === matId && note.type === type);
    //     if (filteredNotes.length > 0) {
    //       return filteredNotes[0].note;
    //     }
    //     return null;
    //   })
    // );
  }
}
