import { TypeNote } from "./enums";
import { Matiere } from "./matiere.model";

export class Note {
    id!: number;
    type!: TypeNote;
    matiere!: Matiere;
  }