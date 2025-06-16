<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Recruteur extends Model
{
    /**
     * La table associée au modèle.
     *
     * @var string
     */
    protected $table = 'recruteurs';

    /**
     * Les attributs qui sont assignables en masse.
     *
     * @var array
     */
    protected $fillable = [
        'nom_entreprise'
    ];

    /**
     * Obtient les offres d'emploi associées à ce recruteur.
     * Définit la relation One-To-Many avec le modèle Offre
     *
     * @return HasMany
     */
    public function offres(): HasMany
    {
        return $this->hasMany(Offre::class);
    }
}
