import React from 'react';

import { DEPTORS } from '../util/data/deptors';

import { Order } from '../util/types/order';
import { Deptor } from '../util/types/deptor';

export interface DeptorContext {
  deptors: Array<Deptor>;
  addDeptor: (name: string) => void;
  removeDeptor: (deptorId: string) => void;
  addOrderToDeptor: (deptorId: string, order: Order) => void;
  removeOrderFromDeptor: (deptorId: string, orderId: string) => void;
}

export const DeptorsContext = React.createContext<DeptorContext>({
  deptors: DEPTORS,
  addDeptor: (_name) => {},
  removeDeptor: (_deptorId) => {},
  addOrderToDeptor: (_deptorId, _order) => {},
  removeOrderFromDeptor: (_deptorId, _orderId) => {}
});
