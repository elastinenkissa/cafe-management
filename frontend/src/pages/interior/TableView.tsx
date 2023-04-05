import React from 'react';
import { FlatList } from 'react-native';
import { useParams } from 'react-router-native';

import OrderItem from '../../components/shared/General/OrderItem';
import ListSeparator from '../../components/shared/UI/ListSeparator';
import PageView from '../../components/shared/General/PageView';

import { Order } from '../../util/types/order';

import { errorLogger } from '../../util/logger/errorLogger';

import tableService from '../../util/services/tableService';

import { UserContext, UserContextType } from '../../util/context/UserContext';

const TableView: React.FC = () => {
  const [orders, setOrders] = React.useState<Array<Order>>([]);

  const { id } = useParams();

  const { user } = React.useContext<UserContextType>(UserContext);

  const fetchOrders = async () => {
    try {
      const fetchedOrders = await tableService.getOrders(id!, user?.cafe.id!);
      setOrders(fetchedOrders);
    } catch (error: any) {
      errorLogger(error);
    }
  };

  React.useEffect(() => {
    fetchOrders();
  }, []);

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
            <OrderItem item={item} onRemove={() => console.log(item.id!)} />
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
