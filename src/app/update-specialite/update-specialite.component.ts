import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecialiteServService } from '../Services/specialite-serv.service';
import { Specialite } from '../Models/specialite.model';

@Component({
  selector: 'app-update-specialite',
  templateUrl: './update-specialite.component.html',
  styleUrl: './update-specialite.component.scss'
})
export class UpdateSpecialiteComponent implements OnInit {
  id!:number;
  frominput!: FormGroup;
  
  constructor(private fb: FormBuilder,private activaterouter:ActivatedRoute,private specserv:SpecialiteServService,private route:Router) {}
  
  ngOnInit(): void {
    this.frominput = this.fb.group({
      'id': [''],
      'nomspec': [''],
    });
    this.activaterouter.params.subscribe(
      (params)=>{
          this.id=params['id']
          //console.log(this.id)
          this.specserv.getSpecialitebyid(this.id).subscribe(
            (u)=>{
              this.frominput.controls['id'].setValue(u.idSpecialite);
              this.frominput.controls['nomspec'].setValue(u.nomSpecialite);

            }
          )
      }
    )
  }
  updatespec() {
    // Vérifiez si l'ID est défini
  if (this.id) {
    let usr: Specialite = new Specialite();
    usr.idSpecialite = this.frominput.controls['id'].value;
    usr.nomSpecialite = this.frominput.controls['nomspec'].value;
    
    this.specserv.updateSpecialite(this.id, usr).subscribe(
      (u) => {
        this.route.navigate(['/listspec']);
      }
    );
  } else {
    console.error("ID de la specialitte non défini.");
  }
}
}
