import { FlatList, StyleSheet, View } from 'react-native';

import Table from '../../components/interior/Table';

import { TABLES } from '../../util/data/tables';
import ListSeparator from '../../components/shared/UI/ListSeparator';

const Cafe: React.FC = () => {
  return (
    <View style={styles.tables}>
      <FlatList
        data={TABLES}
        renderItem={({ item }) => <Table id={item.id} item={item} />}
        ItemSeparatorComponent={ListSeparator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tables: {
    padding: 20,
  }
});

export default Cafe;
