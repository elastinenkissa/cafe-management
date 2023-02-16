import { Employee } from './employee';
import { Order } from './order';
import { Table } from './table';

export interface Change {
  by: Employee;
  timestamp: Date;
}

export interface Log {
  message: string;
  change: Change;
  table: Table;
  orders: Order | Array<Order>;
}
