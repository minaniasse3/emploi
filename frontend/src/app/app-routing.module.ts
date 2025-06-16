import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeOffresComponent } from './components/liste-offres/liste-offres.component';
import { AjoutOffreComponent } from './components/ajout-offre/ajout-offre.component';
import { ListeRecruteursComponent } from './components/liste-recruteurs/liste-recruteurs.component';
import { AjoutRecruteurComponent } from './components/ajout-recruteur/ajout-recruteur.component';

const routes: Routes = [
  // Route par défaut
  { path: '', redirectTo: '/offres', pathMatch: 'full' },
  
  // Routes pour les offres
  { path: 'offres', component: ListeOffresComponent },
  { path: 'offres/ajouter', component: AjoutOffreComponent },
  
  // Routes pour les recruteurs
  { path: 'recruteurs', component: ListeRecruteursComponent },
  { path: 'recruteurs/ajouter', component: AjoutRecruteurComponent },
  
  // Route pour gérer les URLs non trouvées
  { path: '**', redirectTo: '/offres' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
