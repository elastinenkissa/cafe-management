import React from 'react';
import { FlatList, View } from 'react-native';

import Table from '../../components/interior/Table';
import ListSeparator from '../../components/shared/UI/ListSeparator';

import { Table as TableType } from '../../util/types/table';

import tableService from '../../util/services/tableService';

import { useTablesOrDeptors } from '../../util/hooks/useTablesOrDeptors';

const Cafe: React.FC = () => {
  const { tablesOrDeptors, setTablesOrDeptors } =
    useTablesOrDeptors<TableType>(tableService);

  const removeOrdersHandler = (id: string) => {
    setTablesOrDeptors((prevTables) =>
      prevTables?.map((table) =>
        table.id === id ? { ...table, orders: [] } : table
      )
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={tablesOrDeptors}
        renderItem={({ item }) => (
          <Table
            onRemoveOrders={() => removeOrdersHandler(item.id)}
            id={item.id}
            item={item}
          />
        )}
        ItemSeparatorComponent={ListSeparator}
      />
    </View>
  );
};

export default Cafe;
