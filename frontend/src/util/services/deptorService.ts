import { AxiosResponse, CancelTokenSource } from 'axios';

import { Deptor } from '../types/deptor';
import { PopulatedEmployee } from '../types/employee';

import { api } from './api';
import { NewOrder } from '../../components/shared/General/NewOrder';
import { Order } from '../types/order';

const getAll = async (cafeId: string, cancelToken: CancelTokenSource) => {
  const response = await api.get<Deptor, AxiosResponse<Array<Deptor>>>(
    '/deptors',
    {
      params: {
        cafe: cafeId
      },
      cancelToken: cancelToken.token
    }
  );

  return response.data;
};

const addNew = async (
  cafeId: string,
  name: string,
  user: PopulatedEmployee
) => {
  const response = await api.post<
    Deptor,
    AxiosResponse<Deptor>,
    { name: string }
  >(
    '/deptors',
    { name },
    {
      params: {
        cafe: cafeId
      },
      headers: {
        Authorization: `bearer ${user.token}`
      }
    }
  );

  return response.data;
};

const addOrders = async (
  id: string,
  orders: Array<Order>,
  user: PopulatedEmployee
) => {
  await api.patch(
    `/deptors/${id}/addOrders`,
    {
      orders
    },
    {
      headers: {
        Authorization: `bearer ${user.token}`
      }
    }
  );
};

const removeOne = async (id: string, user: PopulatedEmployee) => {
  await api.delete(`/deptors/${id}`, {
    params: {
      cafe: user.cafe.id
    },
    headers: {
      Authorization: `bearer ${user.token}`
    }
  });
};

const addOrder = async (id: string, order: NewOrder, token: string) => {
  const response = await api.patch<
    Deptor,
    AxiosResponse<Order>,
    { orderName: string; orderPrice: number }
  >(
    `/deptors/${id}/addOrder`,
    { orderName: order.name, orderPrice: order.price },
    {
      headers: {
        Authorization: `bearer ${token}`
      }
    }
  );

  return response.data;
};

const getOrders = async (
  id: string,
  cafeId: string,
  cancelToken: CancelTokenSource
) => {
  const response = await api.get<Deptor, AxiosResponse<Array<Order>>>(
    `/deptors/${id}`,
    {
      params: { cafe: cafeId },
      cancelToken: cancelToken.token
    }
  );

  return response.data;
};

export default { getAll, addNew, addOrder, addOrders, getOrders, removeOne };
