<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Offre extends Model
{
    /**
     * La table associée au modèle.
     *
     * @var string
     */
    protected $table = 'offres';

    /**
     * Les attributs qui sont assignables en masse.
     *
     * @var array
     */
    protected $fillable = [
        'titre',
        'description',
        'type_contrat',
        'recruteur_id'
    ];

    /**
     * Obtient le recruteur qui a publié cette offre.
     * Définit la relation Many-To-One avec le modèle Recruteur
     *
     * @return BelongsTo
     */
    public function recruteur(): BelongsTo
    {
        return $this->belongsTo(Recruteur::class);
    }
}
