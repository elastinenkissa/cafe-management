import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { Order } from '../../util/types/order';

interface OrderItemProps {
  item: Order;
}

const OrderItem: React.FC<OrderItemProps> = (props) => {
  return (
    <View style={styles.item}>
      <Text style={styles.text}>{props.item.item}</Text>
      <Button>Remove</Button>
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
