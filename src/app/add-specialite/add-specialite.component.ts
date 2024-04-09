import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecialiteServService } from '../Services/specialite-serv.service';
import { Specialite } from '../Models/specialite.model';

@Component({
  selector: 'app-add-specialite',
  templateUrl: './add-specialite.component.html',
  styleUrl: './add-specialite.component.scss'
})
export class AddSpecialiteComponent implements OnInit {
  id!:number;
  frominput!: FormGroup;
  
  constructor(private fb: FormBuilder,private activaterouter:ActivatedRoute,private specServ:SpecialiteServService,private route:Router) {}
  
  ngOnInit(): void {
    this.frominput = this.fb.group({
      'id': [''],
      'nomspec': [''],
    });
    this.activaterouter.params.subscribe(
      (params)=>{
          this.id=params['id']
          //console.log(this.id)
          this.specServ.getSpecialitebyid(this.id).subscribe(
            (u)=>{
              this.frominput.controls['id'].setValue(u.idSpecialite);
              this.frominput.controls['nomspec'].setValue(u.nomSpecialite);

            }
          )
      }
    )
  }
  addspecialite() {
    let usr : Specialite = new Specialite();
    usr.idSpecialite=this.frominput.controls['id'].value;
    usr.nomSpecialite=this.frominput.controls['nomspec'].value;
    this.specServ.addspecialite(usr).subscribe(
      (u)=>{
  this.route.navigate(['/listspec'])
      }
    )
    }
    

}
