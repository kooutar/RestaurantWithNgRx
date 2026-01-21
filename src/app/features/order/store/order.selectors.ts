import { createSelector } from "@ngrx/store";
import { selectOrder } from "./order.reducers";

export const selectIsItemInOrder = (platId: string) =>
  createSelector(selectOrder, (order) =>
    !!order?.items.find(item => item.platId === platId)
  );