import { StyleSheet, View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';

import AppBar from './src/components/shared/UI/AppBar';
import Cafe from './src/pages/interior/Cafe';
import Debtors from './src/pages/outside/Debtors';

export default function App() {
  return (
    <View>
      <NativeRouter>
        <AppBar />
        <Routes>
          <Route path="/" element={<Cafe />} />
          <Route path="/outside" element={<Debtors />} />
        </Routes>
      </NativeRouter>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
