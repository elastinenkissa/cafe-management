import { Change } from './change';

export interface Order {
  id?: string;
  name: string;
  price: number;
  changes: Array<Change>;
}

export type OrderSchema = Omit<Order, 'id'>;
