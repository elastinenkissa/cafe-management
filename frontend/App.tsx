/* eslint-disable linebreak-style */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Navigate, Route, Routes } from 'react-router-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppBar from './src/components/shared/Navigation/AppBar';
import Cafe from './src/pages/interior/Cafe';
import Debtors from './src/pages/outside/Debtors';
import TableView from './src/pages/interior/TableView';
import DeptorView from './src/pages/outside/DeptorView';
import Options from './src/pages/settings/Options';
import Welcome from './src/pages/settings/Welcome';
import Logs from './src/pages/settings/Logs';
import Employees from './src/pages/settings/Employees';
import ManageCafe from './src/pages/settings/ManageCafe';
import TablesManagement from './src/pages/settings/TablesManagement';
import MenuManagement from './src/pages/settings/MenuManagement';

import { useBack } from './src/util/hooks/useBack';

import { UserContext } from './src/util/context/UserContext';

import { PopulatedEmployee } from './src/util/types/employee';

const BackPress = () => {
  useBack();

  return <></>;
};

const App: React.FC = () => {
  const [user, setUser] = React.useState<PopulatedEmployee | undefined>();

  const getUser = async () => {
    const fetchedUser = await AsyncStorage.getItem('user');
    if (fetchedUser) {
      await setUser(JSON.parse(fetchedUser));
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  const loginHandler = async (userParam: PopulatedEmployee) => {
    setUser(userParam);
    await AsyncStorage.setItem('user', JSON.stringify(userParam));
  };

  const logoutHandler = async () => {
    setUser(undefined);
    await AsyncStorage.removeItem('user');
  };

  return (
    <UserContext.Provider
      value={{ user, login: loginHandler, logout: logoutHandler }}
    >
      <View style={styles.container}>
        <NativeRouter>
          <BackPress />
          <AppBar />
          <Routes>
            {user && <Route path="/" element={<Navigate to="/cafe" />} />}
            <Route path="/" element={<Welcome />} />
            <Route path="/cafe">
              <Route path="" element={<Cafe />} />
              <Route path=":id" element={<TableView />} />
            </Route>
            <Route path="/outside">
              <Route path="" element={<Debtors />} />
              <Route path=":id" element={<DeptorView />} />
            </Route>
            <Route path="/options">
              <Route path="" element={<Options />} />
              <Route path="logs" element={<Logs />} />
              <Route path="employees" element={<Employees />} />
              <Route path="manage">
                <Route path="" element={<ManageCafe />} />
                <Route path="tables" element={<TablesManagement />} />
                <Route path="menu" element={<MenuManagement />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/cafe" replace />} />
          </Routes>
        </NativeRouter>
      </View>
    </UserContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#272a31', height: '100%' }
});

export default App;
