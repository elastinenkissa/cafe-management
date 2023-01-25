import React from 'react';
import { FlatList } from 'react-native';
import { useParams } from 'react-router-native';

import OrderItem from '../../components/shared/Other/OrderItem';
import NewCafeOrder from '../../components/interior/NewCafeOrder';
import ListSeparator from '../../components/shared/UI/ListSeparator';
import PageView from '../../components/shared/Other/PageView';

import { TableContext, TablesContext } from '../../util/context/TablesContext';

const TableView: React.FC = () => {
  const { id } = useParams<string>();

  const { tables, removeOrder } = React.useContext<TableContext>(TablesContext);

  const orders = tables.find((table) => table.id.toString() === id)?.orders;

  return (
    <PageView
      list={
        <FlatList
          data={orders}
          renderItem={({ item }) => (
            <OrderItem item={item} onRemove={() => removeOrder(item.id!)} />
          )}
          keyExtractor={(item) => item.id!}
          ItemSeparatorComponent={ListSeparator}
        />
      }
      entries={orders!}
    />
  );
};

export default TableView;
