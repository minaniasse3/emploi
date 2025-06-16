import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Recruteur } from '../../models/recruteur.model';

@Component({
  selector: 'app-liste-recruteurs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6 text-gray-800">Liste des recruteurs</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let recruteur of recruteurs" class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-gray-800">{{recruteur.nom}}</h2>
            <span class="text-sm text-gray-500">{{recruteur.secteur_activite}}</span>
          </div>
          <div class="space-y-2 text-gray-600">
            <p><span class="font-medium">Entreprise:</span> {{recruteur.entreprise}}</p>
            <p><span class="font-medium">Email:</span> {{recruteur.email}}</p>
            <p><span class="font-medium">Téléphone:</span> {{recruteur.telephone}}</p>
            <p><span class="font-medium">Adresse:</span> {{recruteur.adresse}}</p>
          </div>
          <div class="mt-4 pt-4 border-t border-gray-200 flex justify-end space-x-2">
            <button (click)="voirOffres(recruteur.id!)" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Voir les offres
            </button>
            <button (click)="supprimerRecruteur(recruteur.id!)" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ListeRecruteursComponent implements OnInit {
  recruteurs: Recruteur[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadRecruteurs();
  }

  loadRecruteurs(): void {
    this.apiService.getRecruteurs().subscribe({
      next: (data) => {
        this.recruteurs = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des recruteurs:', error);
      }
    });
  }

  voirOffres(recruteurId: number): void {
    this.apiService.getOffresByRecruteur(recruteurId).subscribe({
      next: (offres) => {
        console.log('Offres du recruteur:', offres);
        // Implémenter la logique pour afficher les offres
      },
      error: (error) => {
        console.error('Erreur lors du chargement des offres:', error);
      }
    });
  }

  supprimerRecruteur(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce recruteur ?')) {
      this.apiService.deleteRecruteur(id).subscribe({
        next: () => {
          this.recruteurs = this.recruteurs.filter(r => r.id !== id);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
        }
      });
    }
  }
}
