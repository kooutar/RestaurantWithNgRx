import { createAction, props } from '@ngrx/store';
import { MenuItem } from '../../../core/services/menu-api.service';


export const loadMenuItems = createAction(
  '[Menu] Load Menu Items'
);

export const loadMenuItemsSuccess = createAction(
  '[Menu] Load Menu Items Success',
  props<{ items: MenuItem[] }>()
);

export const loadMenuItemsFailure = createAction(
  '[Menu] Load Menu Items Failure',
  props<{ error: string }>()
);

export const filterAvailableItems = createAction(
  '[Menu] Filter Available Items',
  props<{ showOnlyAvailable: boolean }>()
);

export const changePage = createAction(
  '[Menu] Change Page',
  props<{ page: number }>()
);