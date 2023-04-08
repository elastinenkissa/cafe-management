import { api } from './api';

import { PopulatedEmployee } from '../types/employee';

const removeOne = async (
  location: string,
  locationId: string,
  orderId: string,
  user: PopulatedEmployee
) => {
  await api.delete(`/${location}/${locationId}/${orderId}`, {
    params: {
      cafe: user.cafe.id
    },
    headers: {
      Authorization: `bearer ${user.token}`
    }
  });
};

const transferOrders = async (
  id: string,
  newDeptorId: string,
  user: PopulatedEmployee
) => {
  await api.put(
    `/orders/${id}/transfer`,
    {
      newDeptorId
    },
    {
      params: {
        cafe: user.cafe.id
      },
      headers: { Authorization: `bearer ${user.token}` }
    }
  );
};

export default { removeOne, transferOrders };
