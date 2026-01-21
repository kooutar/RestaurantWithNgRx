import { Order } from "../order";

export interface OrderState {
  order: Order | null;
  isLoading: boolean;
  error: string | null;
}
