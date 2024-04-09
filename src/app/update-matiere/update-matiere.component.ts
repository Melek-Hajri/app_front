import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatiereServService } from '../Services/matiere-serv.service';
import { Matiere } from '../Models/matiere.model';

@Component({
  selector: 'app-update-matiere',
  templateUrl: './update-matiere.component.html',
  styleUrl: './update-matiere.component.scss'
})
export class UpdateMatiereComponent implements OnInit {
  id!:number;
  frominput!: FormGroup;
  
  constructor(private fb: FormBuilder,private activaterouter:ActivatedRoute,private matserv:MatiereServService,private route:Router) {}
  
  ngOnInit(): void {
    this.frominput = this.fb.group({
      'id': [''],
      'nommat': [''],
      'coiffmat': ['1']
    });
    this.activaterouter.params.subscribe(
      (params)=>{
          this.id=params['id']
          //console.log(this.id)
          this.matserv.getmatierebyid(this.id).subscribe(
            (u)=>{
              this.frominput.controls['id'].setValue(u.idMatiere);
              this.frominput.controls['nommat'].setValue(u.nomMatiere);
              this.frominput.controls['coiffmat'].setValue(u.CoifMatiere);

            }
          )
      }
    )
  }
  updatematiere() {
    // Vérifiez si l'ID est défini
  if (this.id) {
    let usr: Matiere = new Matiere();
    usr.idMatiere = this.frominput.controls['id'].value;
    usr.nomMatiere = this.frominput.controls['nommat'].value;
    usr.CoifMatiere = this.frominput.controls['coiffmat'].value;
    
    this.matserv.updatematiere(this.id, usr).subscribe(
      (u) => {
        this.route.navigate(['/listmatieres']);
      }
    );
  } else {
    console.error("ID de la matière non défini.");
  }
}
}
