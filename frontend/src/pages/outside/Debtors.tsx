import React from 'react';
import { FlatList } from 'react-native';

import PageView from '../../components/shared/General/PageView';
import Deptor from '../../components/outside/Deptor';
import ListSeparator from '../../components/shared/UI/ListSeparator';

import { Deptor as DeptorType } from '../../util/types/deptor';

import deptorService from '../../util/services/deptorService';

import { useTablesOrDeptors } from '../../util/hooks/useTablesOrDeptors';

const Debtors: React.FC = () => {
  const { tablesOrDeptors, setTablesOrDeptors } =
    useTablesOrDeptors<DeptorType>(deptorService);

  const addDeptorHandler = (deptor: DeptorType) => {
    setTablesOrDeptors((prevDeptors) => prevDeptors?.concat(deptor));
  };

  return (
    <PageView
      onAddDeptor={addDeptorHandler}
      outside
      list={
        <FlatList
          data={tablesOrDeptors}
          renderItem={({ item }) => (
            <Deptor
              onRemove={() =>
                setTablesOrDeptors((prevDeptors) =>
                  prevDeptors?.filter((deptor) => deptor.id !== item.id)
                )
              }
              item={item}
              id={item.id}
            />
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ListSeparator}
        />
      }
    />
  );
};

export default Debtors;
