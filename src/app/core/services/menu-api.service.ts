import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

/**
 * Interface représentant un plat
 * (basée sur l'API externe + champ disponible ajouté)
 */
export interface MenuItem {
img: any;
  id?: string;
  name: string;
  description?: string;
  price?: number;
  image?: string;
  category?: string;

  // Champ ajouté par l'application
  disponible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MenuApiService {

  private readonly API_URL =
    'https://free-food-menus-api-two.vercel.app/all';

  constructor(private http: HttpClient) {}

  /**
   * Récupère la liste des plats depuis l'API
   * et ajoute dynamiquement la disponibilité
   */
  getAllMenuItems(): Observable<MenuItem[]> {
  return this.http.get<Record<string, any[]>>(this.API_URL).pipe(
    map((response) => {
      // 1️⃣ Transformer l'objet en tableau
      const plats = Object.values(response).flat();

      // 2️⃣ Ajouter le champ disponible
      return plats.map((plat) => ({
        ...plat,
        disponible: Math.random() > 0.3
      }));
    })
  );
}

 
}
