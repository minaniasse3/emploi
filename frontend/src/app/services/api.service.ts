import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recruteur } from '../models/recruteur.model';
import { Offre, OffresResponse } from '../models/offre.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Services pour les recruteurs
   */

  /**
   * Récupère la liste de tous les recruteurs
   */
  getRecruteurs(): Observable<Recruteur[]> {
    return this.http.get<Recruteur[]>(`${this.apiUrl}/recruteurs`);
  }

  /**
   * Crée un nouveau recruteur
   */
  createRecruteur(recruteur: Recruteur): Observable<Recruteur> {
    return this.http.post<Recruteur>(`${this.apiUrl}/recruteurs`, recruteur);
  }

  /**
   * Récupère les offres d'un recruteur spécifique
   */
  getOffresRecruteur(recruteurId: number): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${this.apiUrl}/recruteurs/${recruteurId}/offres`);
  }

  /**
   * Services pour les offres
   */

  /**
   * Récupère la liste des offres avec pagination
   */
  getOffres(page: number = 1, perPage: number = 10): Observable<OffresResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    return this.http.get<OffresResponse>(`${this.apiUrl}/offres`, { params });
  }

  /**
   * Crée une nouvelle offre
   */
  createOffre(offre: Offre): Observable<Offre> {
    return this.http.post<Offre>(`${this.apiUrl}/offres`, offre);
  }

  /**
   * Recherche des offres par type de contrat
   */
  searchOffresByType(typeContrat: string): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${this.apiUrl}/offres/type/${typeContrat}`);
  }

  /**
   * Recherche des offres par mot-clé
   */
  searchOffres(keyword: string): Observable<Offre[]> {
    const params = new HttpParams().set('q', keyword);
    return this.http.get<Offre[]>(`${this.apiUrl}/offres/search`, { params });
  }
}
