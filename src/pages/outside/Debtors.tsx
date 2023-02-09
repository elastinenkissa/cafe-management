import React from 'react';
import { FlatList } from 'react-native';

import PageView from '../../components/shared/General/PageView';
import Deptor from '../../components/outside/Deptor';
import ListSeparator from '../../components/shared/UI/ListSeparator';

import {
  DeptorContext,
  DeptorsContext
} from '../../util/context/DeptorsContext';

const Debtors: React.FC = () => {
  const { deptors } = React.useContext<DeptorContext>(DeptorsContext);
  return (
    <PageView
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
