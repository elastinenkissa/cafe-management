import { Order } from './order';

export interface Deptor {
  id: string;
  name: string;
  orders: Array<Order>;
  paid: boolean;
}
 