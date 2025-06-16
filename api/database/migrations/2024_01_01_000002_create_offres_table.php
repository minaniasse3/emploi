<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Exécute les migrations.
     */
    public function up(): void
    {
        Schema::create('offres', function (Blueprint $table) {
            $table->id(); // Crée une colonne ID auto-incrémentée
            $table->string('titre'); // Titre de l'offre d'emploi
            $table->text('description'); // Description détaillée de l'offre
            $table->string('type_contrat'); // Type de contrat (CDI, CDD, Stage, etc.)
            $table->foreignId('recruteur_id') // Clé étrangère vers la table recruteurs
                  ->constrained('recruteurs')
                  ->onDelete('cascade'); // Supprime les offres si le recruteur est supprimé
            $table->timestamps(); // Crée created_at et updated_at
        });
    }

    /**
     * Annule les migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offres');
    }
};
