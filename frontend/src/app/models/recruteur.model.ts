/**
 * Interface représentant un recruteur
 */
export interface Recruteur {
    id?: number;           // Identifiant unique du recruteur (optionnel pour la création)
    nom_entreprise: string; // Nom de l'entreprise du recruteur
    created_at?: string;   // Date de création (optionnel, géré par le backend)
    updated_at?: string;   // Date de mise à jour (optionnel, géré par le backend)
}
