import { Recruteur } from './recruteur.model';

/**
 * Type représentant les types de contrats possibles
 */
export type TypeContrat = 'CDI' | 'CDD' | 'Stage' | 'Freelance';

/**
 * Interface représentant une offre d'emploi
 */
export interface Offre {
    id?: number;           // Identifiant unique de l'offre (optionnel pour la création)
    titre: string;         // Titre de l'offre
    description: string;   // Description détaillée de l'offre
    type_contrat: TypeContrat; // Type de contrat (CDI, CDD, Stage, Freelance)
    recruteur_id: number; // ID du recruteur qui a créé l'offre
    recruteur?: Recruteur; // Objet recruteur (optionnel, inclus lors du chargement avec relations)
    created_at?: string;   // Date de création (optionnel, géré par le backend)
    updated_at?: string;   // Date de mise à jour (optionnel, géré par le backend)
}

/**
 * Interface pour la pagination des offres
 */
export interface OffresResponse {
    current_page: number;   // Page courante
    data: Offre[];         // Liste des offres
    first_page_url: string; // URL de la première page
    from: number;          // Index du premier élément
    last_page: number;     // Numéro de la dernière page
    last_page_url: string; // URL de la dernière page
    next_page_url: string | null; // URL de la page suivante
    path: string;          // Chemin de base de l'URL
    per_page: number;      // Nombre d'éléments par page
    prev_page_url: string | null; // URL de la page précédente
    to: number;            // Index du dernier élément
    total: number;         // Nombre total d'éléments
}
