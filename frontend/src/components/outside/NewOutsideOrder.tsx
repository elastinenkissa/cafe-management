import React from 'react';

import NewOrder, { NewOrder as NewOrderType } from '../shared/General/NewOrder';

import { UserContext, UserContextType } from '../../util/context/UserContext';

import deptorService from '../../util/services/deptorService';

import { Order } from '../../util/types/order';

import { errorLogger } from '../../util/logger/errorLogger';

interface NewOutsideOrderProps {
  closeModal: () => void;
  onAddOrder: (order: Order) => void;
}

const NewOutsideOrder: React.FC<NewOutsideOrderProps> = (props) => {
  const { user } = React.useContext<UserContextType>(UserContext);

  const addOrderHandler = async (order: NewOrderType) => {
    try {
      const newOrder = await deptorService.addOrder(order.deptor!, order, user!);
      props.onAddOrder(newOrder);
    } catch (error: any) {
      errorLogger(error);
    }
  };

  return <NewOrder addOrder={addOrderHandler} closeModal={props.closeModal} />;
};

export default NewOutsideOrder;
