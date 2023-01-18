import { Order } from './order';

export interface Table {
  id: number;
  orders: Array<Order> | undefined;
}
