import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Recruteur } from '../../models/recruteur.model';
import { TypeContrat } from '../../models/offre.model';

@Component({
  selector: 'app-ajout-offre',
  template: `
    <div class="max-w-2xl mx-auto">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Ajouter une offre d'emploi</h2>

      <form [formGroup]="offreForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <!-- Titre -->
        <div>
          <label for="titre" class="block text-sm font-medium text-gray-700">Titre</label>
          <input type="text" 
                 id="titre" 
                 formControlName="titre"
                 class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          <div *ngIf="offreForm.get('titre')?.invalid && offreForm.get('titre')?.touched"
               class="text-red-600 text-sm mt-1">
            Le titre est requis
          </div>
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" 
                    formControlName="description"
                    rows="4"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
          <div *ngIf="offreForm.get('description')?.invalid && offreForm.get('description')?.touched"
               class="text-red-600 text-sm mt-1">
            La description est requise
          </div>
        </div>

        <!-- Type de contrat -->
        <div>
          <label for="type_contrat" class="block text-sm font-medium text-gray-700">Type de contrat</label>
          <select id="type_contrat" 
                  formControlName="type_contrat"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">Sélectionnez un type</option>
            <option value="CDI">CDI</option>
            <option value="CDD">CDD</option>
            <option value="Stage">Stage</option>
            <option value="Freelance">Freelance</option>
          </select>
          <div *ngIf="offreForm.get('type_contrat')?.invalid && offreForm.get('type_contrat')?.touched"
               class="text-red-600 text-sm mt-1">
            Le type de contrat est requis
          </div>
        </div>

        <!-- Recruteur -->
        <div>
          <label for="recruteur_id" class="block text-sm font-medium text-gray-700">Recruteur</label>
          <select id="recruteur_id" 
                  formControlName="recruteur_id"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">Sélectionnez un recruteur</option>
            <option *ngFor="let recruteur of recruteurs" 
                    [value]="recruteur.id">
              {{ recruteur.nom_entreprise }}
            </option>
          </select>
          <div *ngIf="offreForm.get('recruteur_id')?.invalid && offreForm.get('recruteur_id')?.touched"
               class="text-red-600 text-sm mt-1">
            Le recruteur est requis
          </div>
        </div>

        <!-- Boutons -->
        <div class="flex justify-end space-x-4">
          <button type="button"
                  (click)="onCancel()"
                  class="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50">
            Annuler
          </button>
          <button type="submit"
                  [disabled]="offreForm.invalid"
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  `,
  styles: []
})
export class AjoutOffreComponent implements OnInit {
  offreForm: FormGroup;
  recruteurs: Recruteur[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.offreForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      type_contrat: ['', Validators.required],
      recruteur_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadRecruteurs();
  }

  loadRecruteurs(): void {
    this.apiService.getRecruteurs().subscribe({
      next: (recruteurs) => {
        this.recruteurs = recruteurs;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des recruteurs:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.offreForm.valid) {
      this.apiService.createOffre(this.offreForm.value).subscribe({
        next: () => {
          this.router.navigate(['/offres']);
        },
        error: (error) => {
          console.error('Erreur lors de la création de l\'offre:', error);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/offres']);
  }
}
