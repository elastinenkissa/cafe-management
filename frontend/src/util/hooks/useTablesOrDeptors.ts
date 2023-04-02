import React from 'react';

import { UserContext, UserContextType } from '../context/UserContext';

export const useTablesOrDeptors = <DataType>(service: {
  getAll: (cafeId: string) => Promise<any>;
}): Array<DataType> => {
  const [tablesOrDeptors, setTablesOrDeptors] =
    React.useState<Array<DataType>>();

  const { user } = React.useContext<UserContextType>(UserContext);

  const fetchData = async () => {
    const fetchedData = await service.getAll(user?.cafe.id!);
    setTablesOrDeptors(fetchedData);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return tablesOrDeptors!;
};