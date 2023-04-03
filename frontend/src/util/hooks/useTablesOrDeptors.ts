import React from 'react';

import { UserContext, UserContextType } from '../context/UserContext';
import { errorLogger } from '../logger/errorLogger';

export const useTablesOrDeptors = <DataType>(service: {
  getAll: (cafeId: string) => Promise<any>;
}): Array<DataType> => {
  const [tablesOrDeptors, setTablesOrDeptors] =
    React.useState<Array<DataType>>();

  const { user } = React.useContext<UserContextType>(UserContext);

  const fetchData = async () => {
    try {
      const fetchedData = await service.getAll(user?.cafe.id!);
      setTablesOrDeptors(fetchedData);
    } catch (error: any) {
      errorLogger(error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return tablesOrDeptors!;
};
