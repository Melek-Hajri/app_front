import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatiereServService } from '../Services/matiere-serv.service';
import { Matiere } from '../Models/matiere.model';
import { module } from '../Models/module.model';
import { ModuleServService } from '../Services/module-serv.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-add-matiere',
  templateUrl: './add-matiere.component.html',
  styleUrl: './add-matiere.component.scss'
})
export class AddMatiereComponent implements OnInit {
  id!:number;
  frominput!: FormGroup;
  modules: module[] = [];
  
  constructor(private fb: FormBuilder,private activaterouter:ActivatedRoute,private matserv:MatiereServService,private modserv : ModuleServService, private route:Router) {}
  
  ngOnInit(): void {
    this.frominput = this.fb.group({
      'id': [''],
      'nommat': [''],
      'coiffmat': [''],
      'module': ['']
    });
    this.modserv.getallmodules().subscribe(
      (modules) => {
        this.modules = modules;
      },
      (error) => {
        console.error('Error fetching modules:', error);
      }
    );
  }
  addmatiere() {
    let usr : Matiere = new Matiere();
    usr.idMatiere=this.frominput.controls['id'].value;
    usr.nomMatiere=this.frominput.controls['nommat'].value;
    usr.coifMatiere=this.frominput.controls['coiffmat'].value;
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
