export interface Order {
  id?: string;
  name: string;
  price: number;
}

export type OrderSchema = Omit<Order, 'id'>;
