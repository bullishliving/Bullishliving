import { OrderStatus } from "./enums/OrderStatus";

export default interface OrderStatusCount {
  status: OrderStatus;
  count: number;
}
