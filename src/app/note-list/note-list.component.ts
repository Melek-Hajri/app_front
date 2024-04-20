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
import { EmailDonnes } from '../Models/emailDonnes.model';

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
  editingId: number | null = null;
  editedValues: { [key: string]: number | null} = {}; // Object to track edited values, keyed by cell identifier


  toggleEditMode(etd: Etudiant): void {
    this.editingId = etd.id; // Store the ID of the row being edited
    this.matieres.forEach(matiere => {
      this.editedValues[etd.id + "-" + matiere.idMatiere + "-Test"] = this.getNote(etd.id, matiere.idMatiere, this.Test);
      console.log(this.editedValues[etd.id + "-" + matiere.idMatiere + "-Test"])
      this.editedValues[etd.id + "-" + matiere.idMatiere + "-Ds"] = this.getNote(etd.id, matiere.idMatiere, this.Ds) || null;
      this.editedValues[etd.id + "-" + matiere.idMatiere + "-Examen"] = this.getNote(etd.id, matiere.idMatiere, this.Examen) || null;
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
  saveChanges(etd: Etudiant): void {
    // Iterate through editedValues to handle each cell
  Object.keys(this.editedValues).forEach(key => {
    const [etdId, matiereId, type] = key.split('-');
    const noteType: TypeNote = type as TypeNote;
    const newValue: number | null = this.editedValues[key];
    const currentNote = this.etds.find(e => e.id === parseInt(etdId))?.notes.find(n => n.matiere.idMatiere === parseInt(matiereId) && n.type === noteType);

    if (newValue === null) {
      // If the field is cleared, delete the note object if it exists
      if (currentNote) {
        this.noteServ.deleteNote(currentNote.id).subscribe(() => {
          // Remove the note object from the local array
          const index = this.etds.findIndex(e => e.id === parseInt(etdId));
          const noteIndex = this.etds[index].notes.findIndex(n => n.id === currentNote.id);
          this.etds[index].notes.splice(noteIndex, 1);
          this.noteServ.deleteNoteEtNotifier(this.etds[index]).subscribe(u =>{})
        });
      }
    } else {
      // If a new value is added or updated, create or update the note object
      const newNote: Note = {
        id: currentNote ? currentNote.id : 0, // Set ID to 0 for new note
        type: noteType,
        note: newValue,
        matiere: this.matieres.find(m => m.idMatiere === parseInt(matiereId))!,
        etudiant: this.etds.find(e => e.id === parseInt(etdId))!
      };

      if (currentNote) {
        // Update existing note object
        this.noteServ.updateNoteEtNotifier(currentNote.id,newNote).subscribe(updatedNote => {
          // Replace the existing note object in the local array
          const index = this.etds.findIndex(e => e.id === parseInt(etdId));
          const noteIndex = this.etds[index].notes.findIndex(n => n.id === currentNote.id);
          this.etds[index].notes[noteIndex] = newNote;
        });
      } else {
        // Create new note object
        this.noteServ.addNote(newNote).subscribe(createdNote => {
          // Add the new note object to the local array
          const index = this.etds.findIndex(e => e.id === parseInt(etdId));
          this.etds[index].notes.push(createdNote);
          this.noteServ.addNoteEtNotifier(this.etds[index]).subscribe(u =>{})
        });
      }
    }
  });
    // Save changes to the database or update the data model
    this.editingId = null; // Exit editing mode
    this.editedValues = {};
  }
  
  cancelEdit(): void {
    // Reset any changes made and exit editing mode
    this.editingId = null;
    this.editedValues = {};
  }
  
}
