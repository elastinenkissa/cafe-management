export interface MenuItem {
  id: string;
  name: string;
  price: number;
}

export type NewMenuItem = Omit<MenuItem, 'id'>;
