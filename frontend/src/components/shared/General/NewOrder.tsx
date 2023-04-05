import 'react-native-get-random-values';
import React from 'react';
import { FlatList } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useParams } from 'react-router-native';

import NewItem from './NewItem';

import { Order } from '../../../util/types/order';
import { useMenu } from '../../../util/hooks/useMenu';

export type NewOrder = Omit<Order, 'id'> & { table: string };

interface NewOrderProps {
  closeModal: () => void;
  addOrder: (order: NewOrder) => void;
}

const NewOrder: React.FC<NewOrderProps> = (props) => {
  const { id } = useParams<string>();

  const [orderItem, setOrderItem] = React.useState<Order>({
    name: '',
    price: 0,
    id: ''
  });

  const { menu } = useMenu();

  const addOrderHandler = (): void => {
    if (!orderItem) {
      return;
    }

    const order = {
      name: orderItem.name,
      price: orderItem.price,
      table: id!
    };

    props.addOrder(order);
    setOrderItem({ name: '', price: 0, id: '' });
    props.closeModal();
  };

  const valueChangeHandler = (value: string) => {
    const selectedItem = menu?.find((item) => item.name === value);
    if (selectedItem) {
      setOrderItem(selectedItem);
    }
  };

  return (
    <NewItem onAddItem={addOrderHandler} valid={orderItem?.name.length > 0}>
      <RadioButton.Group
        value={orderItem.name}
        onValueChange={valueChangeHandler}
      >
        <FlatList
          data={menu}
          renderItem={({ item }) => (
            <RadioButton.Item
              label={item.name}
              value={item.name}
              key={item.id}
            />
          )}
        />
      </RadioButton.Group>
    </NewItem>
  );
};

export default NewOrder;
