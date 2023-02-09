import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useParams } from 'react-router-native';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

import AddFinalButton from '../UI/AddFinalButton';

import { ITEMS } from '../../../util/data/items';

import { Order } from '../../../util/types/order';

interface NewOrderProps {
  closeModal: () => void;
  addOrder: (id: string, order: Order) => void;
}

const NewOrder: React.FC<NewOrderProps> = (props) => {
  const { id } = useParams<string>();

  const [orderItem, setOrderItem] = React.useState<string>('');

  const addOrderHandler = (): void => {
    if (orderItem === '') {
      return;
    }
    const order: Order = {
      id: uuid(),
      ...ITEMS.find((item) => item.name === orderItem)!
    };
    props.addOrder(id!, order);
    setOrderItem('');
    props.closeModal();
  };

  return (
    <View style={styles.buttons}>
      <RadioButton.Group
        value={orderItem}
        onValueChange={(value) => setOrderItem(value)}
      >
        <FlatList
          data={ITEMS}
          renderItem={({ item }) => (
            <RadioButton.Item label={item.name} value={item.name} />
          )}
          keyExtractor={(item) => item.name}
        />
        <AddFinalButton onAdd={addOrderHandler} />
      </RadioButton.Group>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    margin: 40,
    marginTop: '40%',
    backgroundColor: 'white'
  }
});

export default NewOrder;
