import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrderState } from '../store/order.state';
import { Observable } from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectOrder
} from '../store/order.reducers';
import { Order } from '../order';
import { orderActions } from '../store/order.actions';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { MenuItem } from '../../../core/services/menu-api.service';

@Component({
  selector: 'app-order-page',
  imports: [AsyncPipe, FormsModule, DecimalPipe],
  templateUrl: './order-page.component.html',
})
export class OrderPageComponent implements OnInit {
  private store: Store<OrderState> = inject(Store);

  itemQuantity: number = 1;
  showedItem: string = '';

  ngOnInit(): void {
    this.store.dispatch(orderActions.loadOrder());
  }
  addItem(quantity: number, plat: MenuItem) {
    this.store.dispatch(orderActions.addItem({ quantity, plat }));
  }
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
