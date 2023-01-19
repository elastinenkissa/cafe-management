import { Order } from './order';

export interface Deptor {
  name: string;
  orders: Array<Order>;
}
