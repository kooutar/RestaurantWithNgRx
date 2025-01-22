import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrderState } from '../store/order.state';
import { Observable } from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectOrder,
  selectComputedTotalItems,
  selectComputedTotalPrice,
} from '../store/order.reducers';
import { Order } from '../order';
import { orderActions } from '../store/order.actions';
import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [AsyncPipe, CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './order-page.component.html',
})
export class OrderPageComponent implements OnInit {
  private store: Store<OrderState> = inject(Store);

  isLoading$: Observable<boolean> = this.store.select(selectIsLoading);
  error$: Observable<string | null> = this.store.select(selectError);
  order$: Observable<Order | null> = this.store.select(selectOrder);
  totalItems$: Observable<number> = this.store.select(selectComputedTotalItems);
  totalPrice$: Observable<number> = this.store.select(selectComputedTotalPrice);

  ngOnInit(): void {
    this.store.dispatch(orderActions.loadOrder());
  }

  // Actions NgRx pures
  removeItem(platId: string) {
    this.store.dispatch(orderActions.removeItem({ platId }));
  }

  increaseQuantity(platId: string, currentQuantity: number) {
    this.store.dispatch(orderActions.updateItemQuantity({
      platId,
      quantity: currentQuantity + 1
    }));
  }

  decreaseQuantity(platId: string, currentQuantity: number) {
    if (currentQuantity <= 1) {
      this.removeItem(platId); // Ou juste ne rien faire, selon la règle
      return;
    }
    this.store.dispatch(orderActions.updateItemQuantity({
      platId,
      quantity: currentQuantity - 1
    }));
  }

  clearOrder() {
    if (confirm('Voulez-vous vraiment vider votre panier ?')) {
      this.store.dispatch(orderActions.clearOrders());
    }
  }
}
