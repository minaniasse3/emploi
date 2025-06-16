<?php

use App\Http\Controllers\API\OffreController;
use App\Http\Controllers\API\RecruteurController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Ces routes sont chargées par RouteServiceProvider et toutes seront
| préfixées par "api". Vous pouvez ajouter autant de routes que nécessaire.
|
*/

// Routes pour les recruteurs
Route::prefix('recruteurs')->group(function () {
    // Liste tous les recruteurs
    Route::get('/', [RecruteurController::class, 'index'])
        ->name('recruteurs.index');
    
    // Crée un nouveau recruteur
    Route::post('/', [RecruteurController::class, 'store'])
        ->name('recruteurs.store');
    
    // Liste toutes les offres d'un recruteur
    Route::get('/{id}/offres', [RecruteurController::class, 'offres'])
        ->name('recruteurs.offres');
});

// Routes pour les offres
Route::prefix('offres')->group(function () {
    // Liste toutes les offres avec pagination
    Route::get('/', [OffreController::class, 'index'])
        ->name('offres.index');
    
    // Crée une nouvelle offre
    Route::post('/', [OffreController::class, 'store'])
        ->name('offres.store');
    
    // Recherche des offres par type de contrat
    Route::get('/type/{typeContrat}', [OffreController::class, 'searchByType'])
        ->name('offres.search.type');
    
    // Recherche des offres par mot-clé
    Route::get('/search', [OffreController::class, 'search'])
        ->name('offres.search');
});
