import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ajout-recruteur',
  template: `
    <div class="max-w-2xl mx-auto">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Ajouter un recruteur</h2>

      <form [formGroup]="recruteurForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <!-- Nom de l'entreprise -->
        <div>
          <label for="nom_entreprise" 
                 class="block text-sm font-medium text-gray-700">
            Nom de l'entreprise
          </label>
          <input type="text" 
                 id="nom_entreprise" 
                 formControlName="nom_entreprise"
                 class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          <div *ngIf="recruteurForm.get('nom_entreprise')?.invalid && recruteurForm.get('nom_entreprise')?.touched"
               class="text-red-600 text-sm mt-1">
            Le nom de l'entreprise est requis
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
                  [disabled]="recruteurForm.invalid"
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  `,
  styles: []
})
export class AjoutRecruteurComponent {
  recruteurForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.recruteurForm = this.fb.group({
      nom_entreprise: ['', [Validators.required, Validators.maxLength(255)]]
    });
  }

  onSubmit(): void {
    if (this.recruteurForm.valid) {
      this.apiService.createRecruteur(this.recruteurForm.value).subscribe({
        next: () => {
          // Redirection vers la liste des recruteurs après création réussie
          this.router.navigate(['/recruteurs']);
        },
        error: (error) => {
          console.error('Erreur lors de la création du recruteur:', error);
          // Ici, vous pourriez ajouter une notification d'erreur pour l'utilisateur
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/recruteurs']);
  }
}
