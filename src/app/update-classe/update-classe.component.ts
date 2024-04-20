import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasseServService } from '../Services/classe-serv.service';
import { classe } from '../Models/classe.model';

@Component({
  selector: 'app-update-classe',
  templateUrl: './update-classe.component.html',
  styleUrl: './update-classe.component.scss'
})
export class UpdateClasseComponent  implements OnInit {
  id!:number;
  frominput!: FormGroup;
  
  constructor(private fb: FormBuilder,private activaterouter:ActivatedRoute,private claseserv:ClasseServService,private route:Router) {}
  
  ngOnInit(): void {
    this.frominput = this.fb.group({
      'id': [],
      'nomclasse': [''],
      'niveauclasse': [ '']
    });
    this.activaterouter.params.subscribe(
      (params)=>{
        const id = +params['id']; // Convertir en nombre
        this.id = id;
          //this.id=params['id']
          //console.log(this.id)
          this.claseserv.getclassebyid(this.id).subscribe(
            (u)=>{
             this.frominput.controls['id'].setValue(u.idclasse);
              this.frominput.controls['nomclasse'].setValue(u.nomClasse);
              this.frominput.controls['niveauclasse'].setValue(u.niveauClasse);

            }
          )
      }
    )
  }
  updateclasse() {
    let usr : classe = new classe();
    usr.idclasse=this.frominput.controls['id'].value;
    usr.nomClasse=this.frominput.controls['nomclasse'].value;
    usr.niveauClasse=this.frominput.controls['niveauclasse'].value;
    
    this.claseserv.updateClasseEtNotifier(this.id,usr).subscribe(
      (u)=>{
  //this.route.navigate(['/listclasses'])
      }
    )
    this.route.navigate(['/listclasses'])
    }
    

}
