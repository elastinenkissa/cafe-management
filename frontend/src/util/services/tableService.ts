import { AxiosResponse, CancelTokenSource } from 'axios';

import { api } from './api';

import { Table } from '../types/table';
import { NewOrder } from '../../components/shared/General/NewOrder';
import { Order } from '../types/order';
import { PopulatedEmployee } from '../types/employee';

const getAll = async (cafeId: string, cancelToken: CancelTokenSource) => {
  const response = await api.get<Table, AxiosResponse<Array<Table>>>(
    '/tables',
    {
      params: {
        cafe: cafeId
      },
      cancelToken: cancelToken.token
    }
  );

  return response.data;
};

const getOrders = async (
  id: string,
  cafeId: string,
  cancelToken: CancelTokenSource
) => {
  const response = await api.get<Table, AxiosResponse<Array<Order>>>(
    `/tables/${id}`,
    {
      params: { cafe: cafeId },
      cancelToken: cancelToken.token
    }
  );

  return response.data;
};

const addNew = async (user: PopulatedEmployee) => {
  const response = await api.post<Table, AxiosResponse<Table>>(
    '/tables',
    {},
    {
      params: {
        cafe: user.cafe.id
      },
      headers: {
        Authorization: `bearer ${user.token}`
      }
    }
  );

  return response.data;
};

const removeOne = async (cafeId: string, tableId: string) => {
  await api.delete(`/tables/${tableId}`, { params: { cafe: cafeId } });
};

const removeOrders = async (tableId: string, user: PopulatedEmployee) => {
  await api.patch<Table>(
    `/tables/${tableId}/removeOrders`,
    {},
    {
      params: { cafe: user.cafe.id },
      headers: { Authorization: `bearer ${user.token}` }
    }
  );
};

const addOrder = async (
  id: string,
  order: NewOrder,
  user: PopulatedEmployee
) => {
  const response = await api.patch<
    Table,
    AxiosResponse<Order>,
    { orderName: string; orderPrice: number }
  >(
    `/tables/${id}/addOrder`,
    { orderName: order.name, orderPrice: order.price },
    {
      params: {
        cafe: user.cafe.id
      },
      headers: {
        Authorization: `bearer ${user.token}`
      }
    }
  );

  return response.data;
};

export default { getAll, addNew, removeOne, addOrder, getOrders, removeOrders };
