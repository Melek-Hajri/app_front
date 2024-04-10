import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../Models/etudiant.model';
import { EtudiantService } from '../Services/etudiant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { classe } from '../Models/classe.model';
import { ClasseServService } from '../Services/classe-serv.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-etudiant-create',
  templateUrl: './etudiant-create.component.html',
  styleUrl: './etudiant-create.component.scss'
})
export class EtudiantCreateComponent implements OnInit {
  etudiant: Etudiant = new Etudiant(); // Initialize an empty student object
  frominput!: FormGroup;
  classes: classe[] = [];

  constructor(private fb: FormBuilder, private etudiantService: EtudiantService, private classeService: ClasseServService, private route: Router) { }

  ngOnInit(): void {
    this.frominput = this.fb.group({
      'cin': [''],
      'prenom': [''],
      'nom': [''],
      'email': [''],
      'tel': [''],
      'adresse': [''],
      'daten': [''],
      'lieun': [''],
      'classe': [''],
    });

    this.classeService.getallclasses().subscribe(
      (classes) => {
        this.classes = classes;
      },
      (error) => {
        console.error('Error fetching classes:', error);
      }
    );
  }

  createEtudiant(): void {
    let etd: Etudiant = new Etudiant();
    etd.cin = this.frominput.controls['cin'].value;
    etd.prenom = this.frominput.controls['prenom'].value;
    etd.nom = this.frominput.controls['nom'].value;
    etd.email = this.frominput.controls['email'].value;
    etd.tel = this.frominput.controls['tel'].value;
    etd.adresse = this.frominput.controls['adresse'].value;
    etd.daten = this.frominput.controls['daten'].value;
    etd.lieun = this.frominput.controls['lieun'].value;
    
    this.etudiantService.addEtudiant(etd).pipe(
      switchMap((u) => {
        // Chain the affecterEtudiantClasse observable
        return this.etudiantService.affecterEtudiantClasse(u.id, this.frominput.controls['classe'].value);
      })
    ).subscribe(
      () => {
        // Handle successful completion
        console.log('Etudiant added and class affected');
        this.route.navigate(['/listeEtudiants']);
      },
      (error) => {
        // Handle errors
        console.error('Error adding etudiant:', error);
      }
    );
  }
}
