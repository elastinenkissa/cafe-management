import { PopulatedEmployee } from '../types/employee';
import { api } from './api';

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

export default { removeOne };
