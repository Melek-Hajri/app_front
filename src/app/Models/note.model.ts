import { TypeNote } from "./enums";
import { Matiere } from "./matiere.model";

export class Note {
    id!: number;
    type!: TypeNote; // Test, Ds ou Examen
    matiere!: Matiere;
  }