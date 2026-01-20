import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { Order } from "../../features/order/order";

@Injectable({providedIn: 'root'})
export class OrderService {
  private mockOrder: Order = {
    orderId: '1',
    items: [
      {
        platId: 'id1',
        quantity: 2,
      },
      {
        platId: 'id2',
        quantity: 1,
      },
      {
        platId: 'id3',
        quantity: 3,
      },
    ],
  };
  getOrder(): Observable<Order> {
    return of(this.mockOrder).pipe(delay(500));
  }
  addItem(platId: string, quantity: number): Observable<Order> {
    const updatedOrder: Order = {
      ...this.mockOrder,
      items: [...this.mockOrder.items, { platId, quantity }],
    };

    this.mockOrder = updatedOrder;

    return of(updatedOrder).pipe(delay(500));
  }
  removeItem(platId: string): Observable<Order> {
    const updatedOrder: Order = {
      ...this.mockOrder,
      items: this.mockOrder.items.filter((item) => item.platId !== platId),
    };

    this.mockOrder = updatedOrder;

    return of(updatedOrder).pipe(delay(500));
  }
  updateItemQuantity(platId: string, quantity: number): Observable<Order> {
    const updatedOrder: Order = {
      ...this.mockOrder,
      items: [...this.mockOrder.items, { platId, quantity }],
    };
    this.mockOrder = updatedOrder;
    return of(updatedOrder).pipe(delay(500));
  }
}
