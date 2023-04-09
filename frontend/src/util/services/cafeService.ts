import { AxiosResponse, CancelTokenSource } from 'axios';

import { Cafe } from '../types/cafe';
import { PopulatedEmployee } from '../types/employee';
import { MenuItem, NewMenuItem } from '../types/menu';

import { FormData } from '../hooks/useLogin';

import { api } from './api';

interface CafeData {
  name: string;
  currency: string;
}

const createCafe = async (formData: FormData, user: PopulatedEmployee) => {
  const response = await api.post<Cafe, AxiosResponse<Cafe>, CafeData>(
    '/cafe',
    {
      name: formData.cafeName,
      currency: formData.cafeCurrency
    },
    {
      headers: {
        Authorization: `bearer ${user.token}`
      }
    }
  );

  return response.data;
};

const getMenu = async (cafeId: string, sourceToken: CancelTokenSource) => {
  const response = await api.get<Array<MenuItem>>('/cafe/menu', {
    params: {
      cafe: cafeId
    },
    cancelToken: sourceToken.token
  });

  return response.data;
};

interface MenuItemData {
  name: string;
  price: number;
}

const createMenuItem = async (item: NewMenuItem, user: PopulatedEmployee) => {
  const response = await api.post<
    MenuItem,
    AxiosResponse<MenuItem>,
    MenuItemData
  >(
    '/cafe/menu',
    { name: item.name, price: item.price },
    {
      params: { cafe: user.cafe.id },
      headers: {
        Authorization: `bearer ${user.token}`
      }
    }
  );

  return response.data;
};

const removeMenuItem = async (id: string, user: PopulatedEmployee) => {
  await api.delete(`/cafe/menu/${id}`, {
    params: {
      cafe: user.cafe.id
    },
    headers: {
      Authorization: `bearer ${user.token}`
    }
  });
};

export default { createCafe, getMenu, createMenuItem, removeMenuItem };
