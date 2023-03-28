import React from 'react';

import { Employee } from '../types/employee';

export interface UserContextType {
  user: Employee | undefined;
  setUser: (user: Employee) => void;
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
  setUser: (_user: Employee) => {}
});
