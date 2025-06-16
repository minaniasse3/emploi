import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Recruteur } from '../../models/recruteur.model';
import { Offre } from '../../models/offre.model';

@Component({
  selector: 'app-liste-recruteurs',
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold text-gray-900">Liste des recruteurs</h2>
        <a routerLink="/recruteurs/ajouter" 
           class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Ajouter un recruteur
        </a>
      </div>

      <!-- Liste des recruteurs -->
      <div class="grid gap-6">
        <div *ngFor="let recruteur of recruteurs" 
             class="bg-white p-6 rounded-lg shadow-md">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-xl font-semibold text-gray-900">
                {{ recruteur.nom_entreprise }}
              </h3>
              
              <!-- Bouton pour afficher/masquer les offres -->
              <button (click)="toggleOffres(recruteur)"
                      class="mt-2 text-blue-600 hover:text-blue-800">
                {{ recruteur.showOffres ? 'Masquer les offres' : 'Voir les offres' }}
              </button>
            </div>
          </div>

          <!-- Liste des offres du recruteur -->
          <div *ngIf="recruteur.showOffres" class="mt-4">
            <div *ngIf="recruteur.offres?.length; else noOffres"
                 class="space-y-4">
              <div *ngFor="let offre of recruteur.offres"
                   class="bg-gray-50 p-4 rounded">
                <h4 class="font-medium text-gray-900">{{ offre.titre }}</h4>
                <p class="text-gray-600 mt-1">{{ offre.description }}</p>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2"
                      [ngClass]="{
                        'bg-green-100 text-green-800': offre.type_contrat === 'CDI',
                        'bg-blue-100 text-blue-800': offre.type_contrat === 'CDD',
                        'bg-yellow-100 text-yellow-800': offre.type_contrat === 'Stage',
                        'bg-purple-100 text-purple-800': offre.type_contrat === 'Freelance'
                      }">
                  {{ offre.type_contrat }}
                </span>
              </div>
            </div>
            <ng-template #noOffres>
              <p class="text-gray-500 italic">Aucune offre publiée</p>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ListeRecruteursComponent implements OnInit {
  recruteurs: (Recruteur & { showOffres?: boolean; offres?: Offre[] })[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadRecruteurs();
  }

  loadRecruteurs(): void {
    this.apiService.getRecruteurs().subscribe({
      next: (recruteurs) => {
        this.recruteurs = recruteurs.map(r => ({
          ...r,
          showOffres: false
        }));
      },
      error: (error) => {
        console.error('Erreur lors du chargement des recruteurs:', error);
      }
    });
  }

  toggleOffres(recruteur: Recruteur & { showOffres?: boolean; offres?: Offre[] }): void {
    recruteur.showOffres = !recruteur.showOffres;
    
    // Charger les offres si elles n'ont pas encore été chargées
    if (recruteur.showOffres && !recruteur.offres) {
      this.apiService.getOffresRecruteur(recruteur.id!).subscribe({
        next: (offres) => {
          recruteur.offres = offres;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des offres:', error);
          recruteur.showOffres = false;
        }
      });
    }
  }
}
