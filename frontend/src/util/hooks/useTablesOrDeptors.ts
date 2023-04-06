import React from 'react';
import axios, { CancelTokenSource } from 'axios';

import { UserContext, UserContextType } from '../context/UserContext';

import { errorLogger } from '../logger/errorLogger';

export const useTablesOrDeptors = <DataType>(service: {
  getAll: (cafeId: string, cancelToken: CancelTokenSource) => Promise<any>;
}): {
  tablesOrDeptors: Array<DataType>;
  setTablesOrDeptors: React.Dispatch<
    React.SetStateAction<DataType[] | undefined>
  >;
} => {
  const [tablesOrDeptors, setTablesOrDeptors] =
    React.useState<Array<DataType>>();

  const { user } = React.useContext<UserContextType>(UserContext);

  const fetchData = async (cancelToken: CancelTokenSource) => {
    try {
      const fetchedData = await service.getAll(user?.cafe.id!, cancelToken);
      setTablesOrDeptors(fetchedData);
    } catch (error: any) {
      errorLogger(error);
    }
  };

  React.useEffect(() => {
    const source = axios.CancelToken.source();

    fetchData(source);

    return () => {
      source.cancel();
    };
  }, []);

  return { tablesOrDeptors: tablesOrDeptors || [], setTablesOrDeptors };
};
