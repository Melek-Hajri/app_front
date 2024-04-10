import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../Models/etudiant.model';
import { EtudiantService } from '../Services/etudiant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-etudiant-list',
  templateUrl: './etudiant-list.component.html',
  styleUrl: './etudiant-list.component.scss'
})
export class EtudiantListComponent implements OnInit{
  listEtudiants!:Etudiant[] //ceci initialise tableau à vide
  constructor(private etdServ:EtudiantService,private route:Router){

  }
ngOnInit(): void {
 this.etdServ.getAllEtudiants().subscribe(
    (tab)=>{
      this.listEtudiants=tab;

    }
    
  );
}
OnUpdateEtudiant(id:number){
        this.route.navigate(['/updateEtudiant',id])
   

}
OnDeleteEtudiant(id:number){
  this.etdServ.deleteEtudiant(id).subscribe(
    (list)=>{
      this.etdServ.getAllEtudiants().subscribe(
        (list)=>{
          this.listEtudiants=list
          //this.route.navigate(['/listeEtudiants'])
        }
      )
    
    }
  );
}
addNewEtudiant(): void {
  this.route.navigate(['/addEtudiant']);
}
}
