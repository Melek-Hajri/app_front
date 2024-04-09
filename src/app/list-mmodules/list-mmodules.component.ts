import { Component, OnInit } from '@angular/core';
import { module } from '../Models/module.model';
import { ModuleServService } from '../Services/module-serv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-mmodules',
  templateUrl: './list-mmodules.component.html',
  styleUrl: './list-mmodules.component.scss'
})
export class ListMModulesComponent implements OnInit {
  listmodules!:module[] //ceci initialise tableau à vide
  constructor(private modServ:ModuleServService,private route:Router){

  }
ngOnInit(): void {
 this.modServ.getallmodules().subscribe(
(tab)=>{
  this.listmodules=tab;

}
    
  );
}
OnUpdateModule(id:number){
        this.route.navigate(['/updatemodule',id])
   

}
OnDeletemodule(id:number){
  this.modServ.deletemodule(id).subscribe(
    (list)=>{
      this.modServ.getallmodules().subscribe(
        (list)=>{
          this.listmodules=list
          this.route.navigate(['/listmodules'])
        }
      )
    
    }
  );
}
addNewModule(): void {
  // Ajoutez le nouvel objet de classe au tableau ou effectuez d'autres opérations si nécessaire
 
  // Naviguez vers le composant approprié
  this.route.navigate(['/addmodule']);
}

}
