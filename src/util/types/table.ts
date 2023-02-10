import { Order } from './order';

export interface Table {
  id: string;
  name: string;
  orders: Array<Order>;
  paid: boolean;
}
 