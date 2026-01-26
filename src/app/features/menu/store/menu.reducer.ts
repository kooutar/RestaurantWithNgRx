import { createReducer, on } from '@ngrx/store';
import * as MenuActions from './menu.actions';
import { initialMenuState } from './menu.state';

export const menuReducer = createReducer(
  initialMenuState,

  on(MenuActions.loadMenuItems, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(MenuActions.loadMenuItemsSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
    error: null
  })),

  on(MenuActions.loadMenuItemsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(MenuActions.filterAvailableItems, (state, { showOnlyAvailable }) => ({
    ...state,
    showOnlyAvailable
  })),
  on(MenuActions.changePage, (state, { page }) => ({
    ...state,
    currentPage: page
  })),

  on(MenuActions.updateItemAvailability, (state, { id, disponible }) => ({
    ...state,
    items: state.items.map(item =>
      item.id === id ? { ...item, disponible } : item
    )
  }))
);