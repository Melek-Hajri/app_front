import { TypeNote } from "./enums";
import { Etudiant } from "./etudiant.model";
import { Matiere } from "./matiere.model";

export class Note {
    id!: number;
    type!: TypeNote; // Test, Ds ou Examen
    note!: number;
    matiere!: Matiere;
    etudiant!: Etudiant;
  }