import { Employee } from './employee';
import { Order } from './order';

export interface Change {
  by: Employee;
  timestamp: string;
}

export interface Log {
  id: string;
  cafeId: string;
  change: Change;
  from: string;
  orders: Array<Order>;
}
