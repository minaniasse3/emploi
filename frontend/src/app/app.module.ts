import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListeOffresComponent } from './components/liste-offres/liste-offres.component';
import { AjoutOffreComponent } from './components/ajout-offre/ajout-offre.component';
import { ListeRecruteursComponent } from './components/liste-recruteurs/liste-recruteurs.component';
import { AjoutRecruteurComponent } from './components/ajout-recruteur/ajout-recruteur.component';

import { ApiService } from './services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    ListeOffresComponent,
    AjoutOffreComponent,
    ListeRecruteursComponent,
    AjoutRecruteurComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
