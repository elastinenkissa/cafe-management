import { Employee } from './employee';

export interface Change {
  by: Employee;
  timestamp: Date;
}
 