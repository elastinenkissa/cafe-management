import { Cafe } from './cafe';

export interface Employee {
  id: string;
  username: string;
  name: string;
  token: string;
  cafe: string;
}

export type PopulatedEmployee = Omit<Employee, 'cafe'> & {
  cafe: Cafe;
};
