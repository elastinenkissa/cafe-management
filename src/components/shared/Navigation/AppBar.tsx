import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

import Link from '../UI/Link';

const AppBar: React.FC = () => {
  return (
    <>
      <StatusBar backgroundColor="#ADD8E6" style="light" />
      <View style={styles.container}>
        <Link to="/" background="black">
          <Text style={styles.link}>Cafe</Text>
        </Link>
        <Link to="/outside" background="black">
          <Text style={styles.link}>Outside</Text>
        </Link>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: '#ffc0cb',
    // backgroundColor: 'tomato',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    elevation: 10
    // #ffa0b0
  },
  link: {
    color: 'white',
    fontSize: 20
  }
});

export default AppBar;
