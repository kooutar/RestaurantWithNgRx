import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { OrderService } from "../order.service";
import { orderActions } from "./actions";
import { catchError, map, mergeMap, of } from "rxjs";

export const loadOrderEffect = createEffect(
  (actions$ = inject(Actions), orderService = inject(OrderService))=>
    actions$.pipe(
      ofType(orderActions.loadOrder),
      mergeMap(() => orderService.getOrder().pipe(
        map((order) => orderActions.loadOrderSuccess({ order })),
        catchError((error) => of(orderActions.loadOrderFailure({ error: error.message })))
      ))
    ),
    { functional: true }
);
export const addItemEffect = createEffect(
  (actions$ = inject(Actions), orderService = inject(OrderService))=>
    actions$.pipe(
      ofType(orderActions.addItem),
      mergeMap(({ platId, quantity }) => orderService.addItem(platId, quantity).pipe(
        map((order) => orderActions.addItemSuccess({ order })),
        catchError((error) => of(orderActions.addItemFailure({ error: error.message })))
      ))
    ),
    { functional: true }
);
export const removeItemEffect = createEffect((actions$ = inject(Actions), orderService = inject(OrderService)) =>
  actions$.pipe(
    ofType(orderActions.removeItem),
    mergeMap(({ platId }) =>
      orderService.removeItem(platId).pipe(
        map((order) => orderActions.removeItemSuccess({ order })),
        catchError((error) => of(orderActions.removeItemFailure({ error: error.message })))
      )
    )
  ),
  { functional: true }
);
export const updateItemQuantityEffect = createEffect(
  (actions$ = inject(Actions), orderService = inject(OrderService))=>
    actions$.pipe(
      ofType(orderActions.updateItemQuantity),
      mergeMap(({ platId, quantity }) => orderService.updateItemQuantity(platId, quantity).pipe(
        map((order) => orderActions.updateItemQuantitySuccess({ order })),
        catchError((error) => of(orderActions.updateItemQuantityFailure({ error: error.message })))
      ))
    ),
    { functional: true }
);
