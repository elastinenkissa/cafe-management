import { Employee } from './employee';
import { Table } from './table';

export interface Log {
  message: string;
  employee: Employee;
  table: Table;
}
