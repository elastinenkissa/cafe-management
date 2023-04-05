import React from 'react';

import NewOrder, { NewOrder as NewOrderType } from '../shared/General/NewOrder';

import { Order } from '../../util/types/order';

import tableService from '../../util/services/tableService';

import { UserContext, UserContextType } from '../../util/context/UserContext';

import { errorLogger } from '../../util/logger/errorLogger';

interface NewCafeOrderProps {
  closeModal: () => void;
  onAddOrder: (order: Order) => void;
}

const NewCafeOrder: React.FC<NewCafeOrderProps> = (props) => {
  const { token } = React.useContext<UserContextType>(UserContext).user!;

  const addOrderHandler = async (order: NewOrderType) => {
    try {
      const newOrder = await tableService.addOrder(order.table, order, token);
      props.onAddOrder(newOrder);
    } catch (error: any) {
      errorLogger(error);
    }
  };

  return <NewOrder addOrder={addOrderHandler} closeModal={props.closeModal} />;
};

export default NewCafeOrder;
