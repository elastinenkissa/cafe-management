import React from 'react';

import { PopulatedEmployee } from '../types/employee';

export interface UserContextType {
  user: PopulatedEmployee | undefined;
  setUser: (user: PopulatedEmployee) => void;
}

export const UserContext = React.createContext<UserContextType>({
  user: {
    id: '',
    name: '',
    token: '',
    username: '',
    cafe: {
      id: '',
      name: '',
      menu: [],
      tables: [],
      deptors: [],
      currency: '',
      owner: ''
    }
  },
  setUser: (_user: PopulatedEmployee) => {}
});
