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

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss'
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
      console.log("clsId:"+this.clsId);
      this.loadData();
    } else {
      console.log("empty");
      this.modules = [];
      this.etds = [];
      this.notes = [];
    }
  }

  loadData(): void {
    console.log("loadData");
    this.clsServ.getclassebyid(this.clsId).subscribe(cls=> {
      this.cls = cls;
      //console.log("hello");
      //console.log(this.cls);
    });
    this.modServ.getModuleByClasse(this.clsId).subscribe(modules => {
      this.modules = modules;
      console.log(this.modules);
    });
    this.etdServ.afficherEtudiantsClasse(this.clsId).subscribe(etds => {
      this.etds = etds;
      //console.log(this.etds);
    });
  }

  getMatieresMod(modId: number) :Matiere[] {
    this.matieres = [];
    this.matServ.getMatiereByMod(modId).subscribe(matieres => {
      this.matieres = matieres;
      console.log("getmatieres"+matieres)
    })
    return this.matieres;
  }

  getNote(etdId: number, matId: number, type: TypeNote): number | null {
    this.notes = [];
    this.noteServ.getNotesByEtudiantMatiere(etdId, matId).subscribe(notes => {
      this.notes = notes;
    });
    for(let n of this.notes){
      if(n.type = type) {return n.note;}
    }
    return null;
  }

}
