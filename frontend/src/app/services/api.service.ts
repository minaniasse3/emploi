import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Recruteur } from '../models/recruteur.model';
import { Offre } from '../models/offre.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else if (error.status === 200 && error.statusText === 'OK' && error.error instanceof ProgressEvent) {
      // JSON parsing error with status 200
      errorMessage = 'Erreur lors de la lecture des données';
      console.error('JSON parsing error:', error);
    } else {
      // Server-side error
      errorMessage = `Code d'erreur: ${error.status}, message: ${error.message}`;
    }
    
    console.error('API Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // Recruteurs
  getRecruteurs(): Observable<Recruteur[]> {
    return this.http.get<Recruteur[]>(`${this.apiUrl}/recruteurs`)
      .pipe(catchError(this.handleError));
  }

  getRecruteur(id: number): Observable<Recruteur> {
    return this.http.get<Recruteur>(`${this.apiUrl}/recruteurs/${id}`)
      .pipe(catchError(this.handleError));
  }

  createRecruteur(recruteur: Recruteur): Observable<Recruteur> {
    return this.http.post<Recruteur>(`${this.apiUrl}/recruteurs`, recruteur)
      .pipe(catchError(this.handleError));
  }

  updateRecruteur(id: number, recruteur: Recruteur): Observable<Recruteur> {
    return this.http.put<Recruteur>(`${this.apiUrl}/recruteurs/${id}`, recruteur)
      .pipe(catchError(this.handleError));
  }

  deleteRecruteur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/recruteurs/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Offres
  getOffres(): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${this.apiUrl}/offres`)
      .pipe(catchError(this.handleError));
  }

  getOffre(id: number): Observable<Offre> {
    return this.http.get<Offre>(`${this.apiUrl}/offres/${id}`)
      .pipe(catchError(this.handleError));
  }

  createOffre(offre: Offre): Observable<Offre> {
    return this.http.post<Offre>(`${this.apiUrl}/offres`, offre)
      .pipe(catchError(this.handleError));
  }

  updateOffre(id: number, offre: Offre): Observable<Offre> {
    return this.http.put<Offre>(`${this.apiUrl}/offres/${id}`, offre)
      .pipe(catchError(this.handleError));
  }

  deleteOffre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/offres/${id}`)
      .pipe(catchError(this.handleError));
  }

  getOffresByRecruteur(recruteurId: number): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${this.apiUrl}/recruteurs/${recruteurId}/offres`)
      .pipe(catchError(this.handleError));
  }
}
