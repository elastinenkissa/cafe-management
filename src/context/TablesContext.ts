import React from 'react';

import { TABLES } from '../util/data/tables';

import { Table } from '../util/types/table';
import { Order } from '../util/types/order';

export interface TableContext {
  tables: Array<Table>;
  addOrder: (id: string, order: Order) => void;
}

export const TablesContext = React.createContext<TableContext>({
  tables: TABLES,
  addOrder: (_id: string, _order: Order) => {}
});
