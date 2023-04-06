import React from 'react';
import { FlatList } from 'react-native';

import PageView from '../../components/shared/General/PageView';
import OrderItem from '../../components/shared/General/OrderItem';
import ListSeparator from '../../components/shared/UI/ListSeparator';

import { useOrders } from '../../util/hooks/useOrders';

import { Order } from '../../util/types/order';

import deptorService from '../../util/services/deptorService';

const DeptorView: React.FC = () => {
  const { orders, setOrders, removeOrder } = useOrders(deptorService);

  const addOrderHandler = (order: Order) => {
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
          ItemSeparatorComponent={ListSeparator}
          keyExtractor={(item) => item.id!}
        />
      }
      entries={orders!}
    />
  );
};

export default DeptorView;
