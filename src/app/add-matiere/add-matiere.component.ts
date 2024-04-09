import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatiereServService } from '../Services/matiere-serv.service';
import { Matiere } from '../Models/matiere.model';

@Component({
  selector: 'app-add-matiere',
  templateUrl: './add-matiere.component.html',
  styleUrl: './add-matiere.component.scss'
})
export class AddMatiereComponent implements OnInit {
  id!:number;
  frominput!: FormGroup;
  
  constructor(private fb: FormBuilder,private activaterouter:ActivatedRoute,private matserv:MatiereServService,private route:Router) {}
  
  ngOnInit(): void {
    this.frominput = this.fb.group({
      'id': [''],
      'nommat': [''],
      'coiffmat': ['']
    });
    this.activaterouter.params.subscribe(
      (params)=>{
          this.id=params['iduser']
          //console.log(this.id)
          this.matserv.getmatierebyid(this.id).subscribe(
            (u)=>{
              this.frominput.controls['id'].setValue(u.idMatiere);
              this.frominput.controls['nommat'].setValue(u.nomMatiere);
              this.frominput.controls['coiffmat'].setValue(u.coifMatiere);

            }
          )
      }
    )
  }
  addmatiere() {
    let usr : Matiere = new Matiere();
    usr.idMatiere=this.frominput.controls['id'].value;
    usr.nomMatiere=this.frominput.controls['nommat'].value;
    usr.coifMatiere=this.frominput.controls['coiffmat'].value;
    this.matserv.addmatiere(usr).subscribe(
      (u)=>{
  this.route.navigate(['/listmatieres'])
      }
    )
    }
    
}
