import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Order } from "../../features/order/order";
import { LocalStorageService } from "./local-storage.service";
import { MenuItem } from "./menu-api.service";
import { ToastService } from "./toast.service";

@Injectable({ providedIn: 'root' })
export class OrderService {
  private order: Order;

  constructor(private storageService: LocalStorageService<Order>, private toastService: ToastService) {
    const storedOrder = this.storageService.get('order');
    if (storedOrder) {
      this.order = storedOrder;
    } else {
      this.order = {
        orderId: Date.now().toString(),
        items: [],
      };
      this.storageService.set('order', this.order);
    }
  }

  /**
   * Retrieves the current order.
   * @returns Observable of the current order
   */
  getOrder(): Observable<Order> {
    return of(this.order);
  }

  /**
   * Adds an item to the order with the specified platId and quantity.
   * @param platId ID of the item to be added to the order
   * @param quantity Quantity of the item to be added
   * @returns Observable of updated Order after adding the item with the given platId and quantity
   */
  addItem(quantity: number, plat: MenuItem): Observable<Order> {
    const updatedOrder: Order = {
      ...this.order,
      items: [
        ...this.order.items.find((item => item.platId === plat.id))
          ? this.order.items.map((item) => item.platId === plat.id ? { ...item, quantity: item.quantity + quantity } : item)
          : [...this.order.items, { platId: plat.id || Date.now().toString(), quantity, plat }],
      ],
    };

    this.toastService.show(plat.name);
    return this.updateAndStoreOrder(updatedOrder);
  }

  /**
   * Removes an item from the order based on the provided platId.
   * @param platId ID of the item to be removed from the order
   * @returns Observable of updated Order after removing the item with the given platId
   */
  removeItem(platId: string): Observable<Order> {
    const updatedOrder: Order = {
      ...this.order,
      items: this.order.items.filter((item) => item.platId !== platId),
    };

    return this.updateAndStoreOrder(updatedOrder);
  }

  /**
   * Updates the quantity of a specific item in the order.
   * @param platId ID of the item to be updated
   * @param quantity New quantity for the item
   * @returns Observable of updated Order after updating the quantity of the item with the given platId
   */
  updateItemQuantity(platId: string, quantity: number): Observable<Order> {
    const updatedOrder: Order = {
      ...this.order,
      items: [
        ...this.order.items.map((item) =>
          item.platId === platId ? { platId, quantity, plat: item.plat } : item,
        ),
      ],
    };
    return this.updateAndStoreOrder(updatedOrder);
  }

  /**
   * Clears all items from the current order.
   * @returns Observable of updated Order after clearing all items
   */
  clearOrder(): Observable<Order> {
    const updatedOrder: Order = {
      ...this.order,
      items: [],
    };
    return this.updateAndStoreOrder(updatedOrder);
  }
  private updateAndStoreOrder(updatedOrder: Order): Observable<Order> {
    this.order = updatedOrder;
    this.storageService.set('order', updatedOrder);
    return of(updatedOrder);
  }
}
