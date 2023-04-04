import 'react-native-get-random-values';
import React from 'react';
import { FlatList } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useParams } from 'react-router-native';
import { v4 as uuid } from 'uuid';

import NewItem from './NewItem';

import { ITEMS } from '../../../util/data/items';

import { Order } from '../../../util/types/order';
import { useMenu } from '../../../util/hooks/useMenu';

interface NewOrderProps {
  closeModal: () => void;
  addOrder: (id: string, order: Order) => void;
}

const NewOrder: React.FC<NewOrderProps> = (props) => {
  const { id } = useParams<string>();

  const [orderItem, setOrderItem] = React.useState<string>('');

  const { menu } = useMenu();

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
    <NewItem onAddItem={addOrderHandler} valid={orderItem.length > 0}>
      <RadioButton.Group
        value={orderItem}
        onValueChange={(value) => setOrderItem(value)}
      >
        <FlatList
          data={menu}
          renderItem={({ item }) => (
            <RadioButton.Item label={item.name} value={item.name} />
          )}
          keyExtractor={(item) => item.name}
        />
      </RadioButton.Group>
    </NewItem>
  );
};

export default NewOrder;
