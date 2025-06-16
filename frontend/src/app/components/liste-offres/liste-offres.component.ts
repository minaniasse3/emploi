import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Offre, OffresResponse } from '../../models/offre.model';

@Component({
  selector: 'app-liste-offres',
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold text-gray-900">Liste des offres d'emploi</h2>
        <a routerLink="/offres/ajouter" 
           class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Ajouter une offre
        </a>
      </div>

      <!-- Barre de recherche -->
      <div class="flex gap-4">
        <input type="text" 
               [(ngModel)]="searchKeyword"
               placeholder="Rechercher une offre..." 
               class="flex-1 p-2 border rounded">
        <button (click)="searchOffres()"
                class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
          Rechercher
        </button>
      </div>

      <!-- Liste des offres -->
      <div class="grid gap-6">
        <div *ngFor="let offre of offres" 
             class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold text-gray-900">{{ offre.titre }}</h3>
          <p class="mt-2 text-gray-600">{{ offre.description }}</p>
          <div class="mt-4 flex justify-between items-center">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                  [ngClass]="{
                    'bg-green-100 text-green-800': offre.type_contrat === 'CDI',
                    'bg-blue-100 text-blue-800': offre.type_contrat === 'CDD',
                    'bg-yellow-100 text-yellow-800': offre.type_contrat === 'Stage',
                    'bg-purple-100 text-purple-800': offre.type_contrat === 'Freelance'
                  }">
              {{ offre.type_contrat }}
            </span>
            <span class="text-sm text-gray-500">
              {{ offre.recruteur?.nom_entreprise }}
            </span>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div *ngIf="totalPages > 1" class="flex justify-center gap-2 mt-6">
        <button *ngFor="let page of pages"
                (click)="changePage(page)"
                [class.bg-blue-600]="currentPage === page"
                [class.text-white]="currentPage === page"
                class="px-3 py-1 rounded border hover:bg-blue-600 hover:text-white">
          {{ page }}
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class ListeOffresComponent implements OnInit {
  offres: Offre[] = [];
  currentPage = 1;
  totalPages = 1;
  pages: number[] = [];
  searchKeyword = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadOffres();
  }

  loadOffres(): void {
    this.apiService.getOffres(this.currentPage).subscribe({
      next: (response: OffresResponse) => {
        this.offres = response.data;
        this.totalPages = response.last_page;
        this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des offres:', error);
        // Ici, vous pourriez ajouter une notification d'erreur pour l'utilisateur
      }
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.loadOffres();
  }

  searchOffres(): void {
    if (this.searchKeyword.trim()) {
      this.apiService.searchOffres(this.searchKeyword).subscribe({
        next: (offres) => {
          this.offres = offres;
          this.totalPages = 1; // Réinitialiser la pagination pour les résultats de recherche
        },
        error: (error) => {
          console.error('Erreur lors de la recherche:', error);
        }
      });
    } else {
      this.loadOffres(); // Si la recherche est vide, charger toutes les offres
    }
  }
}
