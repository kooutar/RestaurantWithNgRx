import { Order } from "./order";

export interface OrderState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  totalItems: number;
  totalPrice: number;
}
