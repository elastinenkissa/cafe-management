export interface Order {
  id?: string;
  item: string;
  price: number;
}

export type OrderSchema = Omit<Order, 'id'>;
