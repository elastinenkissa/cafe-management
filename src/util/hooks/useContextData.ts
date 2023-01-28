import 'react-native-get-random-values';
import React from 'react';
import { v4 as uuid } from 'uuid';

import { Table } from '../types/table';
import { Deptor } from '../types/deptor';
import { Order } from '../types/order';

import { TABLES } from '../data/tables';
import { DEPTORS } from '../data/deptors';

import { getItem } from '../storage/getItem';
import { saveItem } from '../storage/saveItem';

export const useContextData = () => {
  const [tables, setTables] = React.useState<Array<Table>>(TABLES);
  const [deptors, setDeptors] = React.useState<Array<Deptor>>(DEPTORS);

  const getItems = async () => {
    const fetchedTables = await getItem('tables');
    const fetchedDeptors = await getItem('deptors');
    if (!fetchedTables || !fetchedDeptors) {
      return;
    }
    setTables(fetchedTables);
    setDeptors(fetchedDeptors);
  };

  const saveItems = async () => {
    await saveItem('tables', tables);
    await saveItem('deptors', deptors);
  };

  const addOrder = (id: string, order: Order): void => {
    setTables(
      tables.map((table) =>
        table.id.toString() === id
          ? { ...table, orders: table.orders!.concat(order) }
          : table
      )
    );
  };

  const removeOrder = (id: string): void => {
    setTables(
      tables.map((table) => ({
        ...table,
        orders: table.orders?.filter((order) => order.id !== id)
      }))
    );
  };

  const addDeptor = (name: string): void => {
    const deptor = { id: uuid(), name, orders: [], paid: false };
    setDeptors(deptors.concat(deptor));
  };

  const removeDeptor = (id: string): void => {
    setDeptors(deptors.filter((deptor) => deptor.id !== id));
  };

  const addOrderToDeptor = (id: string, order: Order): void => {
    setDeptors(
      deptors.map((deptor) =>
        deptor.id === id
          ? { ...deptor, orders: deptor.orders.concat(order) }
          : deptor
      )
    );
  };

  const removeOrderFromDeptor = (deptorId: string, orderId: string): void => {
    setDeptors(
      deptors.map((deptor) =>
        deptor.id === deptorId
          ? {
              ...deptor,
              orders: deptor.orders.filter((order) => order.id !== orderId)
            }
          : deptor
      )
    );
  };

  const changeDeptorToPaid = (deptorId: string): void => {
    setDeptors(
      deptors.map((deptor) =>
        deptor.id === deptorId
          ? {
              ...deptor,
              paid: true
            }
          : deptor
      )
    );
  };

  React.useEffect(() => {
    getItems();
  }, []);

  React.useEffect(() => {
    saveItems();
  }, [
    addOrder,
    addDeptor,
    addOrderToDeptor,
    removeOrder,
    removeDeptor,
    removeOrderFromDeptor,
    changeDeptorToPaid
  ]);

  return {
    tables: {
      items: tables,
      addOrder,
      removeOrder
    },
    deptors: {
      items: deptors,
      addDeptor,
      removeDeptor,
      addOrderToDeptor,
      removeOrderFromDeptor,
      changeDeptorToPaid
    }
  };
};
