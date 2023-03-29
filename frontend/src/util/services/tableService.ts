import { api } from './api';

const getTables = async (cafeId: string) => {
  const response = await api.get('/tables', {
    params: {
      cafe: cafeId
    }
  });

  return response.data;
};

export default { getTables };
