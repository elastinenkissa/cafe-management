import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';

import AppBar from './src/components/shared/Navigation/AppBar';
import Cafe from './src/pages/interior/Cafe';
import Debtors from './src/pages/outside/Debtors';
import TableView from './src/pages/interior/TableView';
import DeptorView from './src/pages/outside/DeptorView';

import { TablesContext } from './src/util/context/TablesContext';
import { DeptorsContext } from './src/util/context/DeptorsContext';

import { useBack } from './src/util/hooks/useBack';
import { useContextData } from './src/util/hooks/useContextData';

const BackPress = () => {
  useBack();

  return <View></View>;
};

const App: React.FC = () => {
  const { tables, deptors } = useContextData();

  return (
    <TablesContext.Provider
      value={{
        tables: tables.items,
        addOrder: tables.addOrder,
        removeOrder: tables.removeOrder
      }}
    >
      <DeptorsContext.Provider
        value={{
          deptors: deptors.items,
          addDeptor: deptors.addDeptor,
          removeDeptor: deptors.removeDeptor,
          addOrderToDeptor: deptors.addOrderToDeptor,
          removeOrderFromDeptor: deptors.removeOrderFromDeptor,
          changeDeptorToPaid: deptors.changeDeptorToPaid
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
