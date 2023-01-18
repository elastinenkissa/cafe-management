import { FlatList, StyleSheet } from 'react-native';

import { Table as TableType } from '../../util/types/table';
import Table from './Table';

interface TableRowProps {
  tables: Array<TableType>;
}

const TableRow: React.FC<TableRowProps> = (props) => {
  return (
    <FlatList
      data={props.tables}
      renderItem={({ item }) => <Table id={item.id} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.tables}
    />
  );
};

const styles = StyleSheet.create({
  tables: { justifyContent: 'space-around', height: '90%', paddingLeft: '25%' }
});

export default TableRow;
