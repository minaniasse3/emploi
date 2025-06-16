<?php

namespace App\Services;

use App\Models\Offre;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class OffreService
{
    /**
     * Récupère toutes les offres avec pagination.
     *
     * @param int $perPage Nombre d'offres par page
     * @return LengthAwarePaginator
     */
    public function getAllOffres(int $perPage = 10): LengthAwarePaginator
    {
        return Offre::with('recruteur') // Charge la relation recruteur
                    ->orderBy('created_at', 'desc') // Trie par date de création décroissante
                    ->paginate($perPage);
    }

    /**
     * Crée une nouvelle offre.
     *
     * @param array $data Les données de l'offre
     * @return Offre
     */
    public function createOffre(array $data): Offre
    {
        return Offre::create([
            'titre' => $data['titre'],
            'description' => $data['description'],
            'type_contrat' => $data['type_contrat'],
            'localisation' => $data['localisation'],
            'salaire' => $data['salaire'],
            'recruteur_id' => $data['recruteur_id'],
            'competences_requises' => $data['competences_requises'],
            'date_limite' => $data['date_limite'],
            'statut' => $data['statut']
        ]);
    }

    /**
     * Récupère une offre par son ID.
     *
     * @param int $id L'ID de l'offre
     * @return Offre|null
     */
    public function getOffreById(int $id): ?Offre
    {
        return Offre::with('recruteur')->find($id);
    }

    /**
     * Recherche des offres par type de contrat.
     *
     * @param string $typeContrat Le type de contrat recherché
     * @return Collection
     */
    public function searchByTypeContrat(string $typeContrat): Collection
    {
        return Offre::where('type_contrat', $typeContrat)
                    ->with('recruteur')
                    ->get();
    }

    /**
     * Recherche des offres par mot-clé dans le titre ou la description.
     *
     * @param string $keyword Le mot-clé à rechercher
     * @return Collection
     */
    public function searchByKeyword(string $keyword): Collection
    {
        return Offre::where('titre', 'LIKE', "%{$keyword}%")
                    ->orWhere('description', 'LIKE', "%{$keyword}%")
                    ->with('recruteur')
                    ->get();
    }
}
