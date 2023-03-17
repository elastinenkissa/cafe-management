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

  const removeOrders = (id: string): void => {
    setTables(
      tables.map((table) =>
        table.id === id ? { ...table, orders: [] } : table
      )
    );
  };

  const addDeptor = (name: string): string => {
    const deptor = { id: uuid(), name, orders: [], paid: false };
    setDeptors(deptors.concat(deptor));
    return deptor.id;
  };

  const removeDeptor = (id: string): void => {
    setDeptors((prevDeptors) =>
      prevDeptors.filter((deptor) => deptor.id !== id)
    );
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

  const transferOrders = async (
    name: string,
    tableOrDeptorId: string
  ): Promise<void> => {
    const deptorId = addDeptor(name);

    const tableOrders = tables.find(
      (table) => table.id === tableOrDeptorId
    )?.orders;
    const deptorOrders = deptors.find(
      (deptor) => deptor.id === tableOrDeptorId
    )?.orders;

    await addOrdersToDeptor(
      deptorId,
      tableOrders ? tableOrders : deptorOrders!
    );

    if (tableOrders) {
      removeOrders(tableOrDeptorId);
    }
    if (deptorOrders) {
      removeDeptor(tableOrDeptorId);
    }
  };

  const addOrdersToDeptor = async (
    id: string,
    orders: Array<Order>
  ): Promise<void> => {
    await new Promise<void>((resolve) =>
      setDeptors((prevDeptors) => {
        const newDeptors = prevDeptors.map((deptor) =>
          deptor.id === id
            ? { ...deptor, orders: deptor.orders.concat(orders) }
            : deptor
        );
        resolve();
        return newDeptors;
      })
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
    removeOrders,
    addOrderToDeptor,
    removeOrder,
    removeDeptor,
    removeOrderFromDeptor,
    changeDeptorToPaid,
    transferOrders
  ]);

  return {
    tables: {
      items: tables,
      addOrder,
      removeOrder,
      removeOrders
    },
    deptors: {
      items: deptors,
      addDeptor,
      removeDeptor,
      addOrderToDeptor,
      removeOrderFromDeptor,
      changeDeptorToPaid,
      transferOrders
    }
  };
};
