import React from 'react';
import { FlatList } from 'react-native';

import OrderItem from '../../components/shared/General/OrderItem';
import ListSeparator from '../../components/shared/UI/ListSeparator';
import PageView from '../../components/shared/General/PageView';

import { Order } from '../../util/types/order';

import tableService from '../../util/services/tableService';

import { useOrders } from '../../util/hooks/useOrders';

const TableView: React.FC = () => {
  const { orders, setOrders, removeOrder } = useOrders(tableService);

  const addOrderHandler = async (order: Order) => {
    setOrders((prevOrders) => prevOrders.concat(order));
  };

  return (
    <PageView
      onAddOrder={addOrderHandler}
      list={
        <FlatList
          data={orders}
          renderItem={({ item }) => (
            <OrderItem item={item} onRemove={() => removeOrder(item.id)} />
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
