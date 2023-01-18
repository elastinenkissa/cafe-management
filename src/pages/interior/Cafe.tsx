import { StyleSheet, View } from 'react-native';
import Tables from '../../components/interior/Tables';

const Cafe: React.FC = () => {
  return (
    <View style={styles.tables}>
      <Tables />
    </View>
  );
};

const styles = StyleSheet.create({
  tables: {
    flexDirection: 'row'
  }
});

export default Cafe;
