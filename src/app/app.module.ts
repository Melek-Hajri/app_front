import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ListClassesComponent } from './list-classes/list-classes.component';
import { UpdateClasseComponent } from './update-classe/update-classe.component';
import { EtudiantCreateComponent } from './etudiant-create/etudiant-create.component';
import { EtudiantReadComponent } from './etudiant-read/etudiant-read.component';
import { EtudiantUpdateComponent } from './etudiant-update/etudiant-update.component';
import { EtudiantDeleteComponent } from './etudiant-delete/etudiant-delete.component';
import { EtudiantListComponent } from './etudiant-list/etudiant-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ListClassesComponent,
    UpdateClasseComponent,
    EtudiantCreateComponent,
    EtudiantReadComponent,
    EtudiantUpdateComponent,
    EtudiantDeleteComponent,
    EtudiantListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(),// Ajoutez withFetch() ici
    
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
