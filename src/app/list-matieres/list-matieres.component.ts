import { Component, OnInit } from '@angular/core';
import { Matiere } from '../Models/matiere.model';
import { MatiereServService } from '../Services/matiere-serv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-matieres',
  templateUrl: './list-matieres.component.html',
  styleUrl: './list-matieres.component.scss'
})
export class ListMatieresComponent implements OnInit {
  listmatieres!:Matiere[] //ceci initialise tableau à vide
  constructor(private matServ:MatiereServService,private route:Router){

  }
ngOnInit(): void {
 this.matServ.getallmatieres().subscribe(
(tab)=>{
  this.listmatieres=tab;

}
    
  );
}
OnUpdateMatiere(id:number){
        this.route.navigate(['/updatematiere',id])
   

}
OnDeletematiere(id:number){
  this.matServ.deletematiere(id).subscribe(
    (list)=>{
      this.matServ.getallmatieres().subscribe(
        (list)=>{
          this.listmatieres=list
          this.route.navigate(['/listmatieres'])
        }
      )
    
    }
  );
}
addNewMatiere(): void {
  // Ajoutez le nouvel objet de classe au tableau ou effectuez d'autres opérations si nécessaire
 
  // Naviguez vers le composant approprié
  this.route.navigate(['/addmatiere']);
}
}
