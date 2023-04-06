import React from 'react';
import axios, { CancelTokenSource } from 'axios';
import { useParams } from 'react-router-native';

import { UserContext, UserContextType } from '../context/UserContext';

import { Order } from '../types/order';

import { errorLogger } from '../logger/errorLogger';

export const useOrders = (service: {
  getOrders: (
    id: string,
    cafeId: string,
    cancelToken: CancelTokenSource
  ) => Promise<any>;
}) => {
  const [orders, setOrders] = React.useState<Array<Order>>([]);

  const { id } = useParams();

  const { user } = React.useContext<UserContextType>(UserContext);

  const fetchOrders = async (cancelToken: CancelTokenSource) => {
    try {
      const fetchedOrders = await service.getOrders(
        id!,
        user?.cafe.id!,
        cancelToken
      );
      setOrders(fetchedOrders);
    } catch (error: any) {
      errorLogger(error);
    }
  };

  const removeOrder = (id: string) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  React.useEffect(() => {
    const source = axios.CancelToken.source();

    fetchOrders(source);

    return () => {
      source.cancel();
    };
  }, []);

  return { orders, setOrders, removeOrder };
};
