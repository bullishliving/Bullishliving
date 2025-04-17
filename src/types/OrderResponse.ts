import Order from "./Order";
import { OrderStatus } from "./enums/OrderStatus";

export default interface OrderResponse extends Order {
  id: number;
  is_payment_verified: boolean;
  status: OrderStatus;
  created_at: string;
}
