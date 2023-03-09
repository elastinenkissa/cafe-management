import React from 'react';

import { DEPTORS } from '../data/deptors';

import { Order } from '../types/order';
import { Deptor } from '../types/deptor';

export interface DeptorContext {
  deptors: Array<Deptor>;
  addDeptor: (name: string) => void;
  removeDeptor: (deptorId: string) => void;
  addOrderToDeptor: (deptorId: string, order: Order) => void;
  removeOrderFromDeptor: (deptorId: string, orderId: string) => void;
  changeDeptorToPaid: (deptorId: string) => void;
  transferOrders: (name: string, tableId: string) => void;
}

export const DeptorsContext = React.createContext<DeptorContext>({
  deptors: DEPTORS,
  addDeptor: (_name) => {},
  removeDeptor: (_deptorId) => {},
  addOrderToDeptor: (_deptorId, _order) => {},
  removeOrderFromDeptor: (_deptorId, _orderId) => {},
  changeDeptorToPaid: (_deptorId: string) => {},
  transferOrders: (_name: string, _tableId: string) => {}
});
