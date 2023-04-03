import React from 'react';
import 'react-native-get-random-values';

import NewOrder from '../shared/General/NewOrder';

import { Order } from '../../util/types/order';

import { DeptorContext, DeptorsContext } from '../../util/context/DeptorsContext';

interface NewOutsideOrderProps {
  closeModal: () => void;
}
 
const NewOutsideOrder: React.FC<NewOutsideOrderProps> = (props) => {
  const { addOrderToDeptor } = React.useContext<DeptorContext>(DeptorsContext);

  const addOrderHandler = (id: string, order: Order): void => {
    addOrderToDeptor(id!, order);
  };

  return <NewOrder addOrder={addOrderHandler} closeModal={props.closeModal} />;
};

export default NewOutsideOrder;
