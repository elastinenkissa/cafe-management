import React from 'react';

import { DEPTORS } from '../util/data/deptors';

import { Order } from '../util/types/order';
import { Deptor } from '../util/types/deptor';

export interface DeptorContext {
  deptors: Array<Deptor>;
  addDeptor: (name: string) => void;
  removeDeptor: (deptorId: string) => void;
  addOrderToDeptor: (deptorId: string, order: Order) => void;
}

export const DeptorsContext = React.createContext<DeptorContext>({
  deptors: DEPTORS,
  addDeptor: (_name: string) => {},
  removeDeptor: (_deptorId: string) => {},
  addOrderToDeptor: (_deptorId: string, _order: Order) => {}
});
