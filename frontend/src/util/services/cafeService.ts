import { AxiosResponse } from 'axios';

import { Cafe } from '../types/cafe';
import { PopulatedEmployee } from '../types/employee';

import { FormData } from '../hooks/useLogin';

import { api } from './api';

interface CafeData {
  name: string;
  currency: string;
}

export const createCafe = async (
  formData: FormData,
  user: PopulatedEmployee
) => {
  await api.post<Cafe, AxiosResponse<Cafe, any>, CafeData>(
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

export default { createCafe };
