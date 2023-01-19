import React from 'react';
import 'react-native-get-random-values';

import { Order } from '../../util/types/order';
import NewOrder from '../shared/Other/NewOrder';

interface NewCafeOrderProps {
  closeModal: () => void;
  addOrder: (id: string, order: Order) => void;
}

const NewCafeOrder: React.FC<NewCafeOrderProps> = (props) => {
  const addOrderHandler = (id: string, order: Order): void => {
    props.addOrder(id!, order);
  };

  return <NewOrder addOrder={addOrderHandler} closeModal={props.closeModal} />;
};

export default NewCafeOrder;
