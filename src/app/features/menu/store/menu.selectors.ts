// src/app/store/menu/menu.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MenuState } from './menu.state';

export const selectMenuState = createFeatureSelector<MenuState>('menu');

export const selectAllMenuItems = createSelector(
  selectMenuState,
  (state) => state.items
);

export const selectMenuLoading = createSelector(
  selectMenuState,
  (state) => state.loading
);

export const selectMenuError = createSelector(
  selectMenuState,
  (state) => state.error
);

export const selectShowOnlyAvailable = createSelector(
  selectMenuState,
  (state) => state.showOnlyAvailable
);

export const selectFilteredMenuItems = createSelector(
  selectAllMenuItems,
  selectShowOnlyAvailable,
  (items, showOnlyAvailable) => {
    if (showOnlyAvailable) {
      return items.filter(item => item.disponible);
    }
    return items;
  }
);

export const selectAvailableCount = createSelector(
  selectAllMenuItems,
  (items) => items.filter(item => item.disponible).length
);

export const selectTotalCount = createSelector(
  selectAllMenuItems,
  (items) => items.length
);