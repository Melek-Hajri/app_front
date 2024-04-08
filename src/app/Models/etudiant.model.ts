import { classe } from "./classe.model";
import { Note } from "./note.model";

export class Etudiant {
    id!: number;
    cin!: number;
    daten!: Date;
    lieun!: string;
    adresse!: string;
    tel!: number;
    email!: string;
    nom!: string;
    prenom!: string;
    classe?: classe;
    notes?: Note[];
  }