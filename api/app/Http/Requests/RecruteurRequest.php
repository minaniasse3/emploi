<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RecruteurRequest extends FormRequest
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
            'nom_entreprise' => 'required|string|max:255', // Le nom de l'entreprise est obligatoire et limité à 255 caractères
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
            'nom_entreprise.required' => 'Le nom de l\'entreprise est obligatoire',
            'nom_entreprise.max' => 'Le nom de l\'entreprise ne doit pas dépasser 255 caractères',
        ];
    }
}
