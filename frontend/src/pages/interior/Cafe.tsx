import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import Table from '../../components/interior/Table';
import ListSeparator from '../../components/shared/UI/ListSeparator';

import { Table as TableType } from '../../util/types/table';
import tableService from '../../util/services/tableService';
import { useTablesOrDeptors } from '../../util/hooks/useTablesOrDeptors';

const Cafe: React.FC = () => {
  const tables = useTablesOrDeptors<TableType>(tableService);

  return (
    <View style={styles.tables}>
      <FlatList
        data={tables}
        renderItem={({ item }) => <Table id={item.id} item={item} />}
        ItemSeparatorComponent={ListSeparator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tables: {
    padding: 20
  }
});

export default Cafe;
