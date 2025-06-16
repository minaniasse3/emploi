import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ajout-recruteur',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6 text-gray-800">Ajouter un recruteur</h1>
      <form [formGroup]="recruteurForm" (ngSubmit)="onSubmit()" class="max-w-lg bg-white p-6 rounded shadow">
        <div class="mb-4">
          <label class="block mb-1 font-semibold" for="nom">Nom</label>
          <input 
            id="nom" 
            formControlName="nom" 
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div class="mb-4">
          <label class="block mb-1 font-semibold" for="email">Email</label>
          <input 
            id="email" 
            type="email" 
            formControlName="email" 
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div class="mb-4">
          <label class="block mb-1 font-semibold" for="telephone">Téléphone</label>
          <input 
            id="telephone" 
            formControlName="telephone" 
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div class="mb-4">
          <label class="block mb-1 font-semibold" for="entreprise">Entreprise</label>
          <input 
            id="entreprise" 
            formControlName="entreprise" 
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div class="mb-4">
          <label class="block mb-1 font-semibold" for="secteur_activite">Secteur d'activité</label>
          <input 
            id="secteur_activite" 
            formControlName="secteur_activite" 
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div class="mb-4">
          <label class="block mb-1 font-semibold" for="adresse">Adresse</label>
          <textarea 
            id="adresse" 
            formControlName="adresse" 
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            rows="3"
          ></textarea>
        </div>
        
        <div class="flex justify-between items-center mt-6">
          <button 
            type="button" 
            (click)="annuler()" 
            class="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Annuler
          </button>
          <button 
            type="submit" 
            [disabled]="recruteurForm.invalid" 
            class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  `
})
export class AjoutRecruteurComponent {
  recruteurForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.recruteurForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      entreprise: ['', Validators.required],
      secteur_activite: ['', Validators.required],
      adresse: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.recruteurForm.valid) {
      this.apiService.createRecruteur(this.recruteurForm.value).subscribe({
        next: () => {
          alert('Recruteur ajouté avec succès');
          this.router.navigate(['/recruteurs']);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du recruteur:', error);
          alert('Erreur lors de l\'ajout du recruteur');
        }
      });
    }
  }

  annuler(): void {
    this.router.navigate(['/recruteurs']);
  }
}
