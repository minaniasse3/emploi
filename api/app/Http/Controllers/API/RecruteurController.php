<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\RecruteurRequest;
use App\Services\RecruteurService;
use Illuminate\Http\JsonResponse;

class RecruteurController extends Controller
{
    /**
     * Le service recruteur.
     *
     * @var RecruteurService
     */
    protected $recruteurService;

    /**
     * Constructeur du contrôleur.
     *
     * @param RecruteurService $recruteurService
     */
    public function __construct(RecruteurService $recruteurService)
    {
        $this->recruteurService = $recruteurService;
    }

    /**
     * Liste tous les recruteurs.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $recruteurs = $this->recruteurService->getAllRecruteurs();
            return response()->json([
                'status' => 'success',
                'data' => $recruteurs
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur lors de la récupération des recruteurs: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Crée un nouveau recruteur.
     *
     * @param RecruteurRequest $request
     * @return JsonResponse
     */
    public function store(RecruteurRequest $request): JsonResponse
    {
        try {
            $recruteur = $this->recruteurService->createRecruteur($request->validated());
            return response()->json([
                'status' => 'success',
                'message' => 'Recruteur créé avec succès',
                'data' => $recruteur
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur lors de la création du recruteur: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Affiche les offres d'un recruteur.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function offres(int $id): JsonResponse
    {
        try {
            $offres = $this->recruteurService->getOffresRecruteur($id);
            return response()->json([
                'status' => 'success',
                'data' => $offres
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur lors de la récupération des offres: ' . $e->getMessage()
            ], 500);
        }
    }
}
