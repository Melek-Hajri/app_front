import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatiereServService } from '../Services/matiere-serv.service';
import { Matiere } from '../Models/matiere.model';
import { module } from '../Models/module.model';
import { ModuleServService } from '../Services/module-serv.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-update-matiere',
  templateUrl: './update-matiere.component.html',
  styleUrl: './update-matiere.component.scss'
})
export class UpdateMatiereComponent implements OnInit {
  id!:number;
  frominput!: FormGroup;
  modules: module[] = [];
  
  constructor(private fb: FormBuilder,private activaterouter:ActivatedRoute,private matserv:MatiereServService,private modserv : ModuleServService,private route:Router) {}
  
  ngOnInit(): void {
    this.frominput = this.fb.group({
      'id': [''],
      'nommat': [''],
      'coiffmat': ['1'],
      'module': ['']
    });
    this.activaterouter.params.subscribe(
      (params)=>{
          this.id=params['id']
          //console.log(this.id)
          this.matserv.getmatierebyid(this.id).subscribe(
            (u)=>{
              this.frominput.controls['id'].setValue(u.idMatiere);
              this.frominput.controls['nommat'].setValue(u.nomMatiere);
              this.frominput.controls['coiffmat'].setValue(u.coifMatiere);       
              if (u.m && u.m.idModule) { 
                this.frominput.controls['module'].setValue(u.m.idModule);
              }

            }
          )
          this.modserv.getallmodules().subscribe(
            (modules) => {
              this.modules = modules;
            },
            (error) => {
              console.error('Error fetching modules:', error);
            }
          );
      }
    )
  }
  updatematiere() {
    // Vérifiez si l'ID est défini
    if (this.id) {
      let usr: Matiere = new Matiere();
      usr.idMatiere = this.frominput.controls['id'].value;
      usr.nomMatiere = this.frominput.controls['nommat'].value;
      usr.coifMatiere = this.frominput.controls['coiffmat'].value;
      
      this.matserv.addmatiere(usr).pipe(
        switchMap((u) => {
          return this.matserv.addmatieremodule(u.idMatiere, this.frominput.controls['module'].value);
        })
      ).subscribe(
        () => {
          this.route.navigate(['/listmatieres']);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
