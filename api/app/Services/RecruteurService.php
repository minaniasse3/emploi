<?php

namespace App\Services;

use App\Models\Recruteur;
use Illuminate\Database\Eloquent\Collection;

class RecruteurService
{
    /**
     * Récupère tous les recruteurs.
     *
     * @return Collection
     */
    public function getAllRecruteurs(): Collection
    {
        return Recruteur::all();
    }

    /**
     * Crée un nouveau recruteur.
     *
     * @param array $data Les données du recruteur
     * @return Recruteur
     */
    public function createRecruteur(array $data): Recruteur
    {
        return Recruteur::create([
            'nom_entreprise' => $data['nom_entreprise']
        ]);
    }

    /**
     * Récupère un recruteur par son ID.
     *
     * @param int $id L'ID du recruteur
     * @return Recruteur|null
     */
    public function getRecruteurById(int $id): ?Recruteur
    {
        return Recruteur::find($id);
    }

    /**
     * Récupère toutes les offres d'un recruteur.
     *
     * @param int $recruteurId L'ID du recruteur
     * @return Collection
     */
    public function getOffresRecruteur(int $recruteurId): Collection
    {
        $recruteur = Recruteur::findOrFail($recruteurId);
        return $recruteur->offres;
    }
}
