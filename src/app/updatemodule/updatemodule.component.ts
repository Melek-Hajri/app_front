import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleServService } from '../Services/module-serv.service';
import { module } from '../Models/module.model';

@Component({
  selector: 'app-updatemodule',
  templateUrl: './updatemodule.component.html',
  styleUrl: './updatemodule.component.scss'
})
export class UpdatemoduleComponent implements OnInit {
  id!:number;
  frominput!: FormGroup;
  
  constructor(private fb: FormBuilder,private activaterouter:ActivatedRoute,private modserv:ModuleServService,private route:Router) {}
  
  ngOnInit(): void {
    this.frominput = this.fb.group({
      'id': [''],
      'nommod': [''],
      'coifmod': ['1']
    });
    this.activaterouter.params.subscribe(
      (params)=>{
          this.id=params['id']
          //console.log(this.id)
          this.modserv.getmodulebyid(this.id).subscribe(
            (u)=>{
              this.frominput.controls['id'].setValue(u.idModule);
              this.frominput.controls['nommod'].setValue(u.nomModule);
              this.frominput.controls['coifmod'].setValue(u.coifModule);

            }
          )
      }
    )
  }
  updatemodule() {
    // Vérifiez si l'ID est défini
  if (this.id) {
    let usr: module = new module();
    usr.idModule = this.frominput.controls['id'].value;
    usr.nomModule = this.frominput.controls['nommod'].value;
    usr.coifModule = this.frominput.controls['coifmod'].value;
    
    this.modserv.updatemodule(this.id, usr).subscribe(
      (u) => {
        this.route.navigate(['/listmodules']);
      }
    );
  } else {
    console.error("ID de la module non défini.");
  }
}
}
