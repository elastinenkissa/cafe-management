import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

import { Order } from '../../util/types/order';

import { TableContext, TablesContext } from '../../context/TablesContext';

interface OrderItemProps {
  item: Order;
  id: string;
}

const OrderItem: React.FC<OrderItemProps> = (props) => {
  const { removeOrder } = React.useContext<TableContext>(TablesContext);

  const removeItemHandler = (): void => {
    removeOrder(props.id);
  };

  return (
    <View style={styles.item}>
      <Text style={styles.text}>{props.item.item}</Text>
      <TouchableOpacity onPress={removeItemHandler}>
        <Button>Remove</Button>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontSize: 18
  }
});

export default OrderItem;
