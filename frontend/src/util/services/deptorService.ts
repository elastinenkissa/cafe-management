import { AxiosResponse } from 'axios';
import { Deptor } from '../types/deptor';
import { api } from './api';

const getAll = async (cafeId: string) => {
  const response = await api.get<Deptor, AxiosResponse<Array<Deptor>>>(
    '/deptors',
    {
      params: {
        cafe: cafeId
      }
    }
  );

  return response.data;
};

export default { getAll };
