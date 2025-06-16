import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ajout-offre',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6 text-gray-800">Ajouter une offre</h1>
      <form [formGroup]="offreForm" (ngSubmit)="onSubmit()" class="max-w-lg bg-white p-6 rounded shadow">
        <div class="mb-4">
          <label class="block mb-1 font-semibold" for="titre">Titre</label>
          <input id="titre" formControlName="titre" class="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-semibold" for="description">Description</label>
          <textarea id="description" formControlName="description" class="w-full border border-gray-300 rounded px-3 py-2"></textarea>
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-semibold" for="type_contrat">Type de contrat</label>
          <input id="type_contrat" formControlName="type_contrat" class="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-semibold" for="localisation">Localisation</label>
          <input id="localisation" formControlName="localisation" class="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-semibold" for="salaire">Salaire</label>
          <input id="salaire" formControlName="salaire" class="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-semibold" for="recruteur_id">Recruteur ID</label>
          <input id="recruteur_id" formControlName="recruteur_id" type="number" class="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-semibold" for="competences_requises">Compétences requises</label>
          <input id="competences_requises" formControlName="competences_requises" class="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-semibold" for="date_limite">Date limite</label>
          <input id="date_limite" formControlName="date_limite" type="date" class="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-semibold" for="statut">Statut</label>
          <input id="statut" formControlName="statut" class="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <button type="submit" [disabled]="offreForm.invalid" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Ajouter
        </button>
      </form>
    </div>
  `
})
export class AjoutOffreComponent {
  offreForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.offreForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      type_contrat: ['', Validators.required],
      localisation: ['', Validators.required],
      salaire: ['', Validators.required],
      recruteur_id: [null, Validators.required],
      competences_requises: ['', Validators.required],
      date_limite: ['', Validators.required],
      statut: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.offreForm.valid) {
      this.apiService.createOffre(this.offreForm.value).subscribe({
        next: () => {
          alert('Offre ajoutée avec succès');
          this.offreForm.reset();
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout de l\'offre', err);
          alert('Erreur lors de l\'ajout de l\'offre');
        }
      });
    }
  }
}
