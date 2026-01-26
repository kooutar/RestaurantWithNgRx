import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

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

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService<MenuItem[]>
  ) {}

  /**
   * Récupère la liste des plats depuis l'API
   * et ajoute dynamiquement la disponibilité
   */
  getAllMenuItems(): Observable<MenuItem[]> {
    // Vérifier le cache localStorage
    const cached = this.localStorageService.get('menuItems');
    if (cached) {
      return of(cached).pipe(
        map(items => {
          return items.map(item => ({
            ...item,
            disponible: Math.random() > 0.3
          }));
        })
      );
    }
    // Sinon, fetch depuis l'API
    return this.http.get<Record<string, any[]>>(this.API_URL).pipe(
      map((response) => {
        // 1️⃣ Transformer l'objet en tableau
        const plats = Object.values(response).flat();
        this.localStorageService.set('menuItems', plats);
      // 2️⃣ Ajouter le champ disponible
      return plats.map((plat) => ({
        ...plat,
        disponible: Math.random() > 0.3
      }));
    })
  );
}


}
