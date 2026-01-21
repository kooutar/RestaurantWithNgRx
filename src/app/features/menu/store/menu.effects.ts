import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as MenuActions from './menu.actions';
import { MenuApiService } from '../../../core/services/menu-api.service';

@Injectable()
export class MenuEffects {
  private actions$ = inject(Actions);
  private menuService = inject(MenuApiService);
  
  loadMenuItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MenuActions.loadMenuItems),
      switchMap(() =>
        this.menuService.getAllMenuItems().pipe(
          map(items => MenuActions.loadMenuItemsSuccess({ items })),
          catchError(error => 
            of(MenuActions.loadMenuItemsFailure({ 
              error: error.message || 'Erreur lors du chargement des plats' 
            }))
          )
        )
      )
    )
  );
}