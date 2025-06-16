<?php

use App\Http\Controllers\API\OffreController;
use App\Http\Controllers\API\RecruteurController;
use Illuminate\Support\Facades\Route;

// Test route
Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});

// Routes pour les recruteurs
Route::prefix('recruteurs')->group(function () {
    Route::get('/', [RecruteurController::class, 'index'])->name('recruteurs.index');
    Route::post('/', [RecruteurController::class, 'store'])->name('recruteurs.store');
    Route::get('/{id}/offres', [RecruteurController::class, 'offres'])->name('recruteurs.offres');
});

// Routes pour les offres
Route::prefix('offres')->group(function () {
    Route::get('/', [OffreController::class, 'index'])->name('offres.index');
    Route::post('/', [OffreController::class, 'store'])->name('offres.store');
    Route::get('/type/{typeContrat}', [OffreController::class, 'searchByType'])->name('offres.search.type');
    Route::get('/search', [OffreController::class, 'search'])->name('offres.search');
});
