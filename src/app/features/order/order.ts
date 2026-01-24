import { MenuItem } from "../../core/services/menu-api.service";

interface OrderItem {
  platId: string;
  quantity: number;
  plat: MenuItem;
}
export interface Order {
  orderId: string;
  items: OrderItem[];
}
