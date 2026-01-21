import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Order, Plat } from "../order";
import { MenuItem } from "../../../core/services/menu-api.service";

export const orderActions = createActionGroup({
  source: 'Order',
  events: {
    'Load Order': emptyProps(),
    'Load Order Success': props<{ order: Order }>(),
    'Load Order Failure': props<{ error: string }>(),

    'Add Item': props<{ quantity: number; plat: MenuItem }>(),
    'Add Item Success': props<{ order: Order }>(),
    'Add Item Failure': props<{ error: string }>(),

    'Remove Item': props<{ platId: string }>(),
    'Remove Item Success': props<{ order: Order }>(),
    'Remove Item Failure': props<{ error: string }>(),

    'update Item Quantity': props<{ platId: string; quantity: number }>(),
    'Update Item Quantity Success': props<{ order: Order }>(),
    'Update Item Quantity Failure': props<{ error: string }>(),

    'Clear Orders': emptyProps(),
    'Clear Orders Success': props<{ order: Order }>(),
    'Clear Orders Failure': props<{ error: string }>(),
  },
});
