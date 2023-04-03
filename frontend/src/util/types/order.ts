import { MenuItem } from "./menu";

export interface Order extends MenuItem {
}

export type OrderSchema = Omit<Order, 'id'>;
