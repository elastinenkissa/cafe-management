import { Employee } from './employee';

export interface Change {
  by: Employee;
  timestamp: string;
}

export interface Log {
  id: string;
  cafeId: string;
  change: Change;
  action: string;
  from: string;
  to?: string;
  orders: Array<string>;
}
