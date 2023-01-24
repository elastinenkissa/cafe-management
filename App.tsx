import React from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { NativeRouter, Route, Routes, useNavigate } from 'react-router-native';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

import AppBar from './src/components/shared/Navigation/AppBar';
import Cafe from './src/pages/interior/Cafe';
import Debtors from './src/pages/outside/Debtors';
import TableView from './src/pages/interior/TableView';
import DeptorView from './src/pages/outside/DeptorView';

import { TablesContext } from './src/util/context/TablesContext';
import { DeptorsContext } from './src/util/context/DeptorsContext';

import { Table } from './src/util/types/table';
import { Order } from './src/util/types/order';
import { Deptor } from './src/util/types/deptor';

import { TABLES } from './src/util/data/tables';
import { DEPTORS } from './src/util/data/deptors';

import { getItem } from './src/util/storage/getItem';
import { saveItem } from './src/util/storage/saveItem';

const BackPress = () => {
  const back = useNavigate();

  React.useEffect(() => {
    const backAction = (): boolean => {
      back(-1);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return <View></View>;
};

const App: React.FC = () => {
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
    removeOrderFromDeptor
  ]);

  return (
    <TablesContext.Provider value={{ tables, addOrder, removeOrder }}>
      <DeptorsContext.Provider
        value={{
          deptors,
          addDeptor,
          removeDeptor,
          addOrderToDeptor,
          removeOrderFromDeptor,
          changeDeptorToPaid
        }}
      >
        <View style={styles.container}>
          <NativeRouter>
            <BackPress />
            <AppBar />
            <Routes>
              <Route path="/" element={<Cafe />} />
              <Route path="/outside" element={<Debtors />} />
              <Route path="/outside/:id" element={<DeptorView />} />
              <Route path="/tables/:id" element={<TableView />} />
            </Routes>
          </NativeRouter>
        </View>
      </DeptorsContext.Provider>
    </TablesContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#272a31', height: '100%' }
});

export default App;
