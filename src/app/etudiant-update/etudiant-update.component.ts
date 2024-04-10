import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../Models/etudiant.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EtudiantService } from '../Services/etudiant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { classe } from '../Models/classe.model';
import { ClasseServService } from '../Services/classe-serv.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-etudiant-update',
  templateUrl: './etudiant-update.component.html',
  styleUrl: './etudiant-update.component.scss'
})
export class EtudiantUpdateComponent implements OnInit {
  etudiant: Etudiant = new Etudiant(); // Initialize an empty student object
  id!: number;
  frominput!: FormGroup;
  classes: classe[] = [];

  constructor(private fb: FormBuilder, private activaterouter:ActivatedRoute, private etudiantService: EtudiantService, private classeService: ClasseServService, private route: Router) { }

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
    this.activaterouter.params.subscribe(
      (params)=>{
          this.id=params['id']
          //console.log(this.id)
          this.etudiantService.getEtudiant(this.id).subscribe(
            (u)=>{
              this.frominput.controls['cin'].setValue(u.cin);
              this.frominput.controls['prenom'].setValue(u.prenom);
              this.frominput.controls['nom'].setValue(u.nom);
              this.frominput.controls['email'].setValue(u.email);
              this.frominput.controls['tel'].setValue(u.tel);
              this.frominput.controls['adresse'].setValue(u.adresse);
              this.frominput.controls['daten'].setValue(u.daten);
              this.frominput.controls['lieun'].setValue(u.lieun);
              if (u.classe && u.classe.idclasse) { 
                this.frominput.controls['classe'].setValue(u.classe.idclasse);
              }
            }
          )
      }
    )
    this.classeService.getallclasses().subscribe(
      (classes) => {
        this.classes = classes;
      },
      (error) => {
        console.error('Error fetching classes:', error);
      }
    );
  }

  updateEtudiant(): void {
    let etd: Etudiant = new Etudiant();
    etd.cin = this.frominput.controls['cin'].value;
    etd.prenom = this.frominput.controls['prenom'].value;
    etd.nom = this.frominput.controls['nom'].value;
    etd.email = this.frominput.controls['email'].value;
    etd.tel = this.frominput.controls['tel'].value;
    etd.adresse = this.frominput.controls['adresse'].value;
    etd.daten = this.frominput.controls['daten'].value;
    etd.lieun = this.frominput.controls['lieun'].value;
    
    this.etudiantService.updateEtudiant(this.id, etd).pipe(
      switchMap((u) => {
        return this.etudiantService.affecterEtudiantClasse(this.id, this.frominput.controls['classe'].value);
      })
    ).subscribe(
      () => {
        this.route.navigate(['/listeEtudiants']);
      },
      (error) => {
        console.error('Error adding etudiant:', error);
      }
    );
  }
}
