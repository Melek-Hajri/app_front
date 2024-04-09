import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { module } from '../Models/module.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleServService } from '../Services/module-serv.service';

@Component({
  selector: 'app-addmodule',
  templateUrl: './addmodule.component.html',
  styleUrl: './addmodule.component.scss'
})
export class AddmoduleComponent implements  OnInit {
  id!:number;
  frominput!: FormGroup;
  
  constructor(private fb: FormBuilder,private activaterouter:ActivatedRoute,private modserv:ModuleServService,private route:Router) {}
  
  ngOnInit(): void {
    this.frominput = this.fb.group({
      'id': [''],
      'nommod': [''],
      'coifmod': ['']
    });
    this.activaterouter.params.subscribe(
      (params)=>{
          this.id=params['id']
          //console.log(this.id)
          this.modserv.getmodulebyid(this.id).subscribe(
            (u)=>{
              this.frominput.controls['id'].setValue(u.idModule);
              this.frominput.controls['nommod'].setValue(u.nomModule);
              this.frominput.controls['coifmod'].setValue(u.CoifModule);

            }
          )
      }
    )
  }
  addmodule() {
    // Vérifiez si l'ID est défini
  
    let usr: module = new module();
    usr.idModule = this.frominput.controls['id'].value;
    usr.nomModule = this.frominput.controls['nommod'].value;
    usr.CoifModule = this.frominput.controls['coifmod'].value;
    
    this.modserv.addmodule(usr).subscribe(
      (u) => {
        this.route.navigate(['/listmodules']);
      }
    );
  
}
}
