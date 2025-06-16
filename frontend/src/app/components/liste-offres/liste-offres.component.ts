import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Offre } from '../../models/offre.model';

@Component({
  selector: 'app-liste-offres',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6 text-gray-800">Offres d'emploi</h1>
      
      <!-- Loading State -->
      <div *ngIf="loading" class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>

      <!-- Error State -->
      <div *ngIf="error" class="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">
              {{ errorMessage }}
            </p>
          </div>
        </div>
      </div>

      <!-- No Data State -->
      <div *ngIf="!loading && !error && offres.length === 0" class="text-center py-8">
        <p class="text-gray-500">Aucune offre d'emploi disponible pour le moment.</p>
      </div>

      <!-- Data Display -->
      <div *ngIf="!loading && !error && offres.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let offre of offres" class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-2">{{offre.titre}}</h2>
          <p class="text-gray-600 mb-4">{{offre.description}}</p>
          <div class="flex justify-between items-center text-sm text-gray-500">
            <span>{{offre.type_contrat}}</span>
            <span>{{offre.localisation}}</span>
          </div>
          <div class="mt-4 pt-4 border-t border-gray-200">
            <p class="text-gray-700"><span class="font-medium">Entreprise:</span> {{offre.recruteur?.entreprise}}</p>
            <p class="text-gray-700"><span class="font-medium">Salaire:</span> {{offre.salaire}}</p>
          </div>
          <div class="mt-4 flex justify-end">
            <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Postuler
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ListeOffresComponent implements OnInit {
  offres: Offre[] = [];
  loading = false;
  error = false;
  errorMessage = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadOffres();
  }

  loadOffres(): void {
    this.loading = true;
    this.error = false;
    this.errorMessage = '';

    this.apiService.getOffres().subscribe({
      next: (data) => {
        this.offres = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des offres:', error);
        this.error = true;
        this.errorMessage = error.message || 'Une erreur est survenue lors du chargement des offres.';
        this.loading = false;
      }
    });
  }
}
