import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListClassesComponent } from './list-classes/list-classes.component';
import { UpdateClasseComponent } from './update-classe/update-classe.component';
import { EtudiantListComponent } from './etudiant-list/etudiant-list.component';

const routes: Routes = [
  {path:"listclasses",component:ListClassesComponent},
  {path:"updateclasse",component:UpdateClasseComponent},
  {path:"listeEtudiants",component:EtudiantListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
