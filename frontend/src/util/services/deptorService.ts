import { api } from './api';

const getAll = async (cafeId: string) => {
  const response = await api.get('/deptors', {
    params: {
      cafe: cafeId
    }
  });

  return response.data;
};

export default { getAll };
