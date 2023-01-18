import React from 'react';
import { View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';

import AppBar from './src/components/shared/UI/AppBar';
import Cafe from './src/pages/interior/Cafe';
import Debtors from './src/pages/outside/Debtors';
import TableView from './src/pages/interior/TableView';

import { TablesContext } from './src/context/TablesContext';

import { Table } from './src/util/types/table';
import { Order } from './src/util/types/order';

import { TABLES } from './src/util/data/tables';

const App: React.FC = () => {
  const [tables, setTables] = React.useState<Array<Table>>(TABLES);

  const addOrder = (id: string, order: Order): void => {
    setTables(
      tables.map((table) =>
        table.id.toString() === id
          ? { ...table, orders: table.orders!.concat(order) }
          : table
      )
    );
  };

  return (
    <TablesContext.Provider value={{ tables, addOrder }}>
      <View>
        <NativeRouter>
          <AppBar />
          <Routes>
            <Route path="/" element={<Cafe />} />
            <Route path="/outside" element={<Debtors />} />
            <Route path="/tables/:id" element={<TableView />} />
          </Routes>
        </NativeRouter>
      </View>
    </TablesContext.Provider>
  );
};

export default App;
