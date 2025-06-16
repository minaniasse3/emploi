<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\OffreRequest;
use App\Services\OffreService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OffreController extends Controller
{
    /**
     * Le service offre.
     *
     * @var OffreService
     */
    protected $offreService;

    /**
     * Constructeur du contrôleur.
     *
     * @param OffreService $offreService
     */
    public function __construct(OffreService $offreService)
    {
        $this->offreService = $offreService;
    }

    /**
     * Liste toutes les offres avec pagination.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $perPage = $request->get('per_page', 10);
            $offres = $this->offreService->getAllOffres($perPage);
            
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

    /**
     * Crée une nouvelle offre.
     *
     * @param OffreRequest $request
     * @return JsonResponse
     */
    public function store(OffreRequest $request): JsonResponse
    {
        try {
            $offre = $this->offreService->createOffre($request->validated());
            
            return response()->json([
                'status' => 'success',
                'message' => 'Offre créée avec succès',
                'data' => $offre
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur lors de la création de l\'offre: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Recherche des offres par type de contrat.
     *
     * @param string $typeContrat
     * @return JsonResponse
     */
    public function searchByType(string $typeContrat): JsonResponse
    {
        try {
            $offres = $this->offreService->searchByTypeContrat($typeContrat);
            
            return response()->json([
                'status' => 'success',
                'data' => $offres
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur lors de la recherche des offres: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Recherche des offres par mot-clé.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function search(Request $request): JsonResponse
    {
        try {
            $keyword = $request->get('q');
            if (!$keyword) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Le mot-clé de recherche est requis'
                ], 400);
            }

            $offres = $this->offreService->searchByKeyword($keyword);
            
            return response()->json([
                'status' => 'success',
                'data' => $offres
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur lors de la recherche des offres: ' . $e->getMessage()
            ], 500);
        }
    }
}
