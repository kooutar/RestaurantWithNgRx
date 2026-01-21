import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrderState } from '../store/order.state';
import { Observable } from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectOrder,
  selectTotalItems,
  selectTotalPrice,
} from '../store/order.reducers';
import { Order as order } from '../order';
import { orderActions } from '../store/order.actions';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-order-page',
  imports: [AsyncPipe, FormsModule],
  templateUrl: './order-page.component.html',
})
export class OrderPageComponent implements OnInit {
  private store: Store<OrderState> = inject(Store);
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  order$: Observable<order | null>;
  totalItems$: Observable<number>;
  totalPrice$: Observable<number>;

  itemQuantity: number = 1;
  showedItem: string = "";

  constructor() {
    this.isLoading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectError);
    this.order$ = this.store.select(selectOrder);
    this.totalItems$ = this.store.select(selectTotalItems);
    this.totalPrice$ = this.store.select(selectTotalPrice);
  }
  ngOnInit(): void {
    this.store.dispatch(orderActions.loadOrder());
  }
  addItem(platId: string, quantity: number) {
    this.store.dispatch(orderActions.addItem({ platId, quantity }));
  }
  removeItem(platId: string) {
    this.store.dispatch(orderActions.removeItem({ platId }));
  }
  updateItemQuantity(platId: string = this.showedItem, quantity: number = this.itemQuantity) {
    this.store.dispatch(orderActions.updateItemQuantity({ platId, quantity }));
  }
  clearOrder() {
    this.store.dispatch(orderActions.clearOrders());
  }

  edit(quantity: number, id: string): void {
    this.itemQuantity = quantity;
    this.showedItem = id;
  }
}
