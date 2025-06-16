import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeOffresComponent } from './components/liste-offres/liste-offres.component';
import { AjoutOffreComponent } from './components/ajout-offre/ajout-offre.component';
import { ListeRecruteursComponent } from './components/liste-recruteurs/liste-recruteurs.component';
import { AjoutRecruteurComponent } from './components/ajout-recruteur/ajout-recruteur.component';

export const routes: Routes = [
  { path: '', redirectTo: '/offres', pathMatch: 'full' },
  { path: 'offres', component: ListeOffresComponent },
  { path: 'offres/ajouter', component: AjoutOffreComponent },
  { path: 'recruteurs', component: ListeRecruteursComponent },
  { path: 'recruteurs/ajouter', component: AjoutRecruteurComponent }
];

