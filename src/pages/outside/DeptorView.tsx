import React from 'react';
import { FlatList } from 'react-native';
import { useParams } from 'react-router-native';

import PageView from '../../components/shared/General/PageView';
import OrderItem from '../../components/shared/General/OrderItem';
import ListSeparator from '../../components/shared/UI/ListSeparator';

import {
  DeptorContext,
  DeptorsContext
} from '../../util/context/DeptorsContext';

const DeptorView: React.FC = () => {
  const { id } = useParams();

  const { deptors, removeOrderFromDeptor } =
    React.useContext<DeptorContext>(DeptorsContext);

  const deptor = deptors.find((deptor) => deptor.id === id);
  const orders = deptor?.orders;

  return (
    <PageView
      list={
        <FlatList
          data={orders}
          renderItem={({ item }) => (
            <OrderItem
              item={item}
              onRemove={() => removeOrderFromDeptor(id!, item.id!)}
            />
          )}
          ItemSeparatorComponent={ListSeparator}
          keyExtractor={(item) => item.id!}
        />
      }
      entries={orders!}
    />
  );
};

export default DeptorView;
