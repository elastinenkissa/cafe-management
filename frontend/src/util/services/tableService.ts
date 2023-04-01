import { AxiosResponse } from 'axios';

import { Table } from '../types/table';

import { api } from './api';

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

export default { getAll, addNew, removeOne };
