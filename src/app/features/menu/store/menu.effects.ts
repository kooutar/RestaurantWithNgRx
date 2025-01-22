import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, catchError, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import * as MenuActions from './menu.actions';
import { MenuItem, MenuApiService } from '../../../core/services/menu-api.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { selectAllMenuItems } from './menu.selectors';

@Injectable()
export class MenuEffects {
  private actions$ = inject(Actions);
  private menuService = inject(MenuApiService);
  private localStorageService = inject(LocalStorageService<MenuItem[]>);
  private store = inject(Store);

  private readonly MENU_STORAGE_KEY = 'restaurant_menu';

  loadMenuItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuActions.loadMenuItems),
      switchMap(() => {
        // Try loading from localStorage first
        const cachedMenu = this.localStorageService.get(this.MENU_STORAGE_KEY);

        if (cachedMenu && cachedMenu.length > 0) {
          return of(MenuActions.loadMenuItemsSuccess({ items: cachedMenu }));
        }

        // Fallback to API
        return this.menuService.getAllMenuItems().pipe(
          map(items => MenuActions.loadMenuItemsSuccess({ items })),
          catchError(error =>
            of(MenuActions.loadMenuItemsFailure({
              error: error.message || 'Erreur lors du chargement des plats'
            }))
          )
        );
      })
    )
  );

  // Persist menu to localStorage after successful load or availability update
  persistMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuActions.loadMenuItemsSuccess, MenuActions.updateItemAvailability),
      withLatestFrom(this.store.select(selectAllMenuItems)),
      tap(([_, items]) => {
        this.localStorageService.set(this.MENU_STORAGE_KEY, items);
      })
    ),
    { dispatch: false }
  );

  constructor() { }
}