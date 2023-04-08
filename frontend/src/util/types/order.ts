import { MenuItem } from './menu';

export type Order = MenuItem;

export type OrderSchema = Omit<Order, 'id'>;
