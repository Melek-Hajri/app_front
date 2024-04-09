import { Component, OnInit } from '@angular/core';
import { Specialite } from '../Models/specialite.model';
import { SpecialiteServService } from '../Services/specialite-serv.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-specialites',
  templateUrl: './list-specialites.component.html',
  styleUrl: './list-specialites.component.scss'
})
export class ListSpecialitesComponent implements OnInit {
  listspecialites!:Specialite[] //ceci initialise tableau à vide
  constructor(private specServ:SpecialiteServService,private route:Router){

  }
ngOnInit(): void {
 this.specServ.getallSpecialites().subscribe(
(tab)=>{
  this.listspecialites=tab;

}
    
  );
}
OnUpdateSpecilaite(id:number){
        this.route.navigate(['/updatespecialite',id])
   

}
OnDeletespecialite(id:number){
  this.specServ.deleteSpecialite(id).subscribe(
    (list)=>{
      this.specServ.getallSpecialites().subscribe(
        (list)=>{
          this.listspecialites=list
          this.route.navigate(['/listspec'])
        }
      )
    
    }
  );
}
addNewSpec(): void {
  // Ajoutez le nouvel objet de classe au tableau ou effectuez d'autres opérations si nécessaire
 
  // Naviguez vers le composant approprié
  this.route.navigate(['/addspec']);
}

}
