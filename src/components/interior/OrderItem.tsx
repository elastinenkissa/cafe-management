import React from 'react';

import ListItem from '../shared/Other/ListItem';

import { TableContext, TablesContext } from '../../context/TablesContext';

import { Order } from '../../util/types/order';

interface OrderItemProps {
  item: Order;
  id: string;
}

const OrderItem: React.FC<OrderItemProps> = (props) => {
  const { removeOrder } = React.useContext<TableContext>(TablesContext);

  const removeItemHandler = (): void => {
    removeOrder(props.id);
  };

  return <ListItem onRemove={removeItemHandler} item={props.item} />;
};

export default OrderItem;
