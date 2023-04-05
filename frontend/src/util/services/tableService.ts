import { AxiosResponse } from 'axios';

import { Table } from '../types/table';

import { api } from './api';

import { Order } from '../types/order';
import { NewOrder } from '../../components/shared/General/NewOrder';

const getAll = async (cafeId: string) => {
  const response = await api.get<Table, AxiosResponse<Array<Table>, any>>(
    '/tables',
    {
      params: {
        cafe: cafeId
      }
    }
  );

  return response.data;
};

const getOrders = async (id: string, cafeId: string) => {
  const response = await api.get<Table, AxiosResponse<Array<Order>>>(
    `/tables/${id}`,
    {
      params: { cafe: cafeId }
    }
  );

  return response.data;
};

const addNew = async (cafeId: string) => {
  const response = await api.post<Table, AxiosResponse<Table, any>>(
    '/tables',
    {},
    {
      params: {
        cafe: cafeId
      }
    }
  );

  return response.data;
};

const removeOne = async (cafeId: string, tableId: string) => {
  await api.delete(`/tables/${tableId}`, { params: { cafe: cafeId } });
};

const addOrder = async (id: string, order: NewOrder, token: string) => {
  const response = await api.patch<
    Table,
    AxiosResponse<Order>,
    { orderName: string; orderPrice: number }
  >(
    `/tables/${id}/addOrder`,
    { orderName: order.name, orderPrice: order.price },
    {
      headers: {
        Authorization: `bearer ${token}`
      }
    }
  );

  return response.data;
};

export default { getAll, addNew, removeOne, addOrder, getOrders };
