import { api } from './api';

import { PopulatedEmployee } from '../types/employee';

const removeOne = async (
  location: string,
  locationId: string,
  orderId: string,
  user: PopulatedEmployee
) => {
  await api.delete(`/${location}/${locationId}/${orderId}`, {
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
    {},
    {
      params: {
        newDeptorId
      },
      headers: { Authorization: `bearer ${user.token}` }
    }
  );
};

export default { removeOne, transferOrders };
