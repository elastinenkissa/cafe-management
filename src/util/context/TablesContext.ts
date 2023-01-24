import React from 'react';

import { TABLES } from '../data/tables';

import { Table } from '../types/table';
import { Order } from '../types/order';

export interface TableContext {
  tables: Array<Table>;
  addOrder: (tableId: string, order: Order) => void;
  removeOrder: (orderId: string) => void;
}

export const TablesContext = React.createContext<TableContext>({
  tables: TABLES,
  addOrder: (_tableId: string, _order: Order) => {},
  removeOrder: (_orderId: string) => {}
});
