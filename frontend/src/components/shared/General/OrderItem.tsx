import React from 'react';
import { StyleSheet } from 'react-native';
import { useLocation, useParams } from 'react-router-native';

import ListItem from './ListItem';

import { Order } from '../../../util/types/order';

import orderService from '../../../util/services/orderService';

import {
  UserContext,
  UserContextType
} from '../../../util/context/UserContext';
import { errorLogger } from '../../../util/logger/errorLogger';

interface OrderItemProps {
  item: Order;
  onRemove: () => void;
}

const OrderItem: React.FC<OrderItemProps> = (props) => {
  const [location, setLocation] = React.useState<string>('');

  const { id } = useParams();

  const { user } = React.useContext<UserContextType>(UserContext);

  const { pathname } = useLocation();

  const removeOrderHandler = async () => {
    try {
      console.log(location);

      await orderService.removeOne(location, id!, props.item.id, user!);
      props.onRemove()
    } catch (error: any) {
      errorLogger(error);
    }
  };

  React.useEffect(() => {
    if (pathname.startsWith('/cafe')) {
      setLocation('tables');
    }
    if (pathname.startsWith('/outside')) {
      setLocation('deptors');
    }
  }, [pathname]);

  return (
    <ListItem
      onRemove={removeOrderHandler}
      item={props.item}
      style={styles.item}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 12,
    paddingBottom: 0
  }
});

export default OrderItem;
