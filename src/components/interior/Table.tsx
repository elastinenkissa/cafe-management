import { StyleSheet, View } from 'react-native';

const Table: React.FC = () => {
  return <View style={styles.table}></View>;
};

const styles = StyleSheet.create({
  table: {
    borderWidth: 2,
    borderColor: 'black',
    height: 50,
    width: 50,
    borderRadius: 25
  }
});

export default Table;
