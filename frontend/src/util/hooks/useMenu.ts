import React from 'react';
import axios, { CancelTokenSource } from 'axios';

import { MenuItem } from '../types/menu';

import cafeService from '../services/cafeService';

import { UserContext, UserContextType } from '../context/UserContext';

import { errorLogger } from '../logger/errorLogger';

export const useMenu = () => {
  const [menu, setMenu] = React.useState<Array<MenuItem>>();

  const { user } = React.useContext<UserContextType>(UserContext);

  const fetchMenu = async (cancelToken: CancelTokenSource) => {
    try {
      const fetchedMenu = await cafeService.getMenu(
        user?.cafe.id!,
        cancelToken
      );
      setMenu(fetchedMenu);
    } catch (error: any) {
      errorLogger(error);
    }
  };

  React.useEffect(() => {
    const source = axios.CancelToken.source();

    fetchMenu(source);

    return () => {
      source.cancel();
    };
  }, []);

  return { menu, setMenu };
};
