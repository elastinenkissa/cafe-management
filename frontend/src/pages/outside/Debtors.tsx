import React from 'react';
import { FlatList } from 'react-native';

import PageView from '../../components/shared/General/PageView';
import Deptor from '../../components/outside/Deptor';
import ListSeparator from '../../components/shared/UI/ListSeparator';

import { Deptor as DeptorType } from '../../util/types/deptor';

import deptorService from '../../util/services/deptorService';

import { useTablesOrDeptors } from '../../util/hooks/useTablesOrDeptors';

const Debtors: React.FC = () => {
  const deptors = useTablesOrDeptors<DeptorType>(deptorService);
  
  return (
    <PageView
      outside
      list={
        <FlatList
          data={deptors}
          renderItem={({ item }) => <Deptor item={item} id={item.id} />}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ListSeparator}
        />
      }
    />
  );
};

export default Debtors;
