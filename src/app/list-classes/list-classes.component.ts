import { Component, OnInit } from '@angular/core';
import { classe } from '../Models/classe.model';
import { ClasseServService } from '../Services/classe-serv.service';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-list-classes',
  templateUrl: './list-classes.component.html',
  styleUrl: './list-classes.component.scss'
})
export class ListClassesComponent implements OnInit{
  listclasses!:classe[] //ceci initialise tableau à vide
  constructor(private classServ:ClasseServService,private route:Router){

  }
ngOnInit(): void {
 this.classServ.getallclasses().subscribe(
(tab)=>{
  this.listclasses=tab;

}
    
  );
}
OnUpdateClasse(id:number){
        this.route.navigate(['/updateclasse',id])
   

}
OnDeleteclasse(id:number){
  this.classServ.deleteclasse(id).subscribe(
    (list)=>{
      this.classServ.getallclasses().subscribe(
        (list)=>{
          this.listclasses=list
          this.route.navigate(['/listclasses'])
        }
      )
    
    }
  );
}

}
