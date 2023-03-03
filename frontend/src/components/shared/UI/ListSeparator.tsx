import { StyleSheet, View } from 'react-native';

const ListSeparator: React.FC = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    height: 20
  }
});

export default ListSeparator;
 