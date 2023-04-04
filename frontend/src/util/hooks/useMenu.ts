import React from 'react';

import { MenuItem } from '../types/menu';

import cafeService from '../services/cafeService';

import { UserContext, UserContextType } from '../context/UserContext';

import { errorLogger } from '../logger/errorLogger';

export const useMenu = () => {
  const [menu, setMenu] = React.useState<Array<MenuItem>>();

  const { user } = React.useContext<UserContextType>(UserContext);

  const fetchMenu = async () => {
    try {
      const fetchedMenu = await cafeService.getMenu(user?.cafe.id!);
      setMenu(fetchedMenu);
    } catch (error: any) {
      errorLogger(error);
    }
  };

  React.useEffect(() => {
    fetchMenu();
  }, []);

  return { menu, setMenu };
};
