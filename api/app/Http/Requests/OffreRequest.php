<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OffreRequest extends FormRequest
{
    /**
     * Détermine si l'utilisateur est autorisé à faire cette requête.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true; // Pour simplifier, nous autorisons toutes les requêtes
    }

    /**
     * Obtient les règles de validation qui s'appliquent à la requête.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'titre' => 'required|string|max:255', // Le titre est obligatoire et limité à 255 caractères
            'description' => 'required|string', // La description est obligatoire
            'type_contrat' => 'required|string|in:CDI,CDD,Stage,Freelance', // Le type de contrat doit être l'un des types listés
            'recruteur_id' => 'required|exists:recruteurs,id', // Le recruteur doit exister dans la table recruteurs
        ];
    }

    /**
     * Obtient les messages d'erreur personnalisés pour les règles de validation.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'titre.required' => 'Le titre de l\'offre est obligatoire',
            'titre.max' => 'Le titre ne doit pas dépasser 255 caractères',
            'description.required' => 'La description de l\'offre est obligatoire',
            'type_contrat.required' => 'Le type de contrat est obligatoire',
            'type_contrat.in' => 'Le type de contrat doit être CDI, CDD, Stage ou Freelance',
            'recruteur_id.required' => 'L\'identifiant du recruteur est obligatoire',
            'recruteur_id.exists' => 'Le recruteur sélectionné n\'existe pas',
        ];
    }
}
