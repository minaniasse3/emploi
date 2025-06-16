export interface Offre {
  id?: number;
  titre: string;
  description: string;
  type_contrat: string;
  localisation: string;
  salaire: string;
  recruteur_id: number;
  competences_requises: string;
  date_limite: string;
  statut: string;
  created_at?: string;
  updated_at?: string;
  recruteur?: {
    id: number;
    nom: string;
    entreprise: string;
  };
}
