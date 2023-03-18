import React from 'react';
import { StyleSheet } from 'react-native';

import ListItem from './ListItem';

import { Order } from '../../../util/types/order';

interface OrderItemProps {
  item: Order;
  onRemove: () => void;
}

const OrderItem: React.FC<OrderItemProps> = (props) => {
  return (
    <ListItem onRemove={props.onRemove} item={props.item} style={styles.item} />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    paddingBottom: 0
  }
});

export default OrderItem;
