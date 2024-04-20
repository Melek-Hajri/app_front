import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListClassesComponent } from './list-classes/list-classes.component';
import { UpdateClasseComponent } from './update-classe/update-classe.component';
import { EtudiantListComponent } from './etudiant-list/etudiant-list.component';
import { AddclasseComponent } from './addclasse/addclasse.component';
import { UpdateMatiereComponent } from './update-matiere/update-matiere.component';
import { ListMatieresComponent } from './list-matieres/list-matieres.component';
import { AddMatiereComponent } from './add-matiere/add-matiere.component';
import { UpdateSpecialiteComponent } from './update-specialite/update-specialite.component';
import { AddSpecialiteComponent } from './add-specialite/add-specialite.component';
import { ListSpecialitesComponent } from './list-specialites/list-specialites.component';
import { ListMModulesComponent } from './list-mmodules/list-mmodules.component';
import { UpdatemoduleComponent } from './updatemodule/updatemodule.component';
import { AddmoduleComponent } from './addmodule/addmodule.component';
import { EtudiantCreateComponent } from './etudiant-create/etudiant-create.component';
import { EtudiantUpdateComponent } from './etudiant-update/etudiant-update.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteCreateComponent } from './note-create/note-create.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  {path:"listclasses",component:ListClassesComponent},
  {path:"updateclasse/:id",component:UpdateClasseComponent},
  {path:"listeEtudiants",component:EtudiantListComponent},
  {path:"addclasse",component:AddclasseComponent},
  {path:"updatematiere/:id",component:UpdateMatiereComponent},
  {path:"listmatieres",component:ListMatieresComponent},
  {path:"addmatiere",component:AddMatiereComponent},
  {path:"listspec",component:ListSpecialitesComponent},
  {path:"updatespecialite/:id",component:UpdateSpecialiteComponent},
  {path:"addspec",component:AddSpecialiteComponent},
  {path:"listmodules",component:ListMModulesComponent},
  {path:"updatemodule/:id",component:UpdatemoduleComponent},
  {path:"addmodule",component:AddmoduleComponent},
  {path:"addEtudiant",component:EtudiantCreateComponent},
  {path:"updateEtudiant/:id",component:EtudiantUpdateComponent},
  {path:"listeNotes",component:NoteListComponent},
  {path:"addNote",component:NoteCreateComponent},
  {path:"footer",component:FooterComponent}







  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
