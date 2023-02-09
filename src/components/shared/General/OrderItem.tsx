import React from 'react';

import ListItem from './ListItem';

import { Order } from '../../../util/types/order';

interface OrderItemProps {
  item: Order;
  onRemove: () => void;
}

const OrderItem: React.FC<OrderItemProps> = (props) => {
  return <ListItem onRemove={props.onRemove} item={props.item} />;
};

export default OrderItem;
