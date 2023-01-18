import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

import Link from './Link';

const AppBar: React.FC = () => {
  return (
    <>
      <StatusBar backgroundColor="#ADD8E6" style="light" />
      <View style={styles.container}>
        <Link to="/">Cafe</Link>
        <Link to="/outside">Outside</Link>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: '#ffc0cb',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight
    // #ffa0b0
  }
});

export default AppBar;
