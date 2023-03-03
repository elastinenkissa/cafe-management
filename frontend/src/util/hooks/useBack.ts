import React from 'react';
import { BackHandler } from 'react-native';
import {
  NavigateFunction,
  useLocation,
  useNavigate
} from 'react-router-native';
 
export const useBack = (): void => {
  const redirect: NavigateFunction = useNavigate();
  const { pathname } = useLocation();

  React.useEffect(() => {
    const backAction = (): boolean => {
      if (pathname === '/cafe') {
        return false;
      }
      redirect(-1);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [pathname]);
};
