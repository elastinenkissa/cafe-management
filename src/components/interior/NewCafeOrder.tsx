import React from 'react';
import 'react-native-get-random-values';

import { Order } from '../../util/types/order';
import NewOrder from '../shared/Other/NewOrder';
import { TableContext, TablesContext } from '../../util/context/TablesContext';

interface NewCafeOrderProps {
  closeModal: () => void;
}

const NewCafeOrder: React.FC<NewCafeOrderProps> = (props) => {
  const { addOrder } = React.useContext<TableContext>(TablesContext)

  const addOrderHandler = (id: string, order: Order): void => {
    addOrder(id!, order);
  };

  return <NewOrder addOrder={addOrderHandler} closeModal={props.closeModal} />;
};

export default NewCafeOrder;
