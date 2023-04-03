import { AxiosResponse } from 'axios';

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
  await api.post<Cafe, AxiosResponse<Cafe>, CafeData>(
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
};

const getMenu = async (cafeId: string) => {
  const response = await api.get<MenuItem, AxiosResponse<Array<MenuItem>>>(
    '/cafe/menu',
    {
      params: {
        cafe: cafeId
      }
    }
  );

  return response.data;
};

interface MenuItemData {
  name: string;
  price: number;
}

const createMenuItem = async (
  item: NewMenuItem,
  cafeId: string,
  user: PopulatedEmployee
) => {
  const response = await api.post<
    MenuItem,
    AxiosResponse<MenuItem>,
    MenuItemData
  >(
    '/cafe/menu',
    { name: item.name, price: item.price },
    {
      params: { cafe: cafeId },
      headers: {
        Authorization: `bearer ${user.token}`
      }
    }
  );

  return response.data;
};

export default { createCafe, getMenu, createMenuItem };
