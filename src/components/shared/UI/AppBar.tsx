import { StyleSheet, View } from 'react-native';

import Link from './Link';

const AppBar: React.FC = () => {
  return (
    <View style={styles.container}>
      <Link to="/">Cafe</Link>
      <Link to="/outside">Outside</Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: '#ffc0cb',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
    // #ffa0b0
  }
});

export default AppBar;
