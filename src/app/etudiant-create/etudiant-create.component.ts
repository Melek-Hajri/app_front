import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../Models/etudiant.model';
import { EtudiantService } from '../Services/etudiant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-etudiant-create',
  templateUrl: './etudiant-create.component.html',
  styleUrl: './etudiant-create.component.scss'
})
export class EtudiantCreateComponent implements OnInit {
  etudiant: Etudiant = new Etudiant(); // Initialize an empty student object

  constructor(private etudiantService: EtudiantService, private router: Router) { }

  ngOnInit(): void {
  }

  createEtudiant(): void {
    this.etudiantService.addEtudiant(this.etudiant)
      .subscribe(
        response => {
          console.log(response);
          // Optionally, you can navigate to a different route after successful creation
          this.router.navigate(['/listeEtudiants']);
        },
        error => {
          console.log(error);
        });
  }
}
