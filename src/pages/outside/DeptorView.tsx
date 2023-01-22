import React from 'react';
import { FlatList } from 'react-native';
import { useParams } from 'react-router-native';

import PageView from '../../components/shared/Other/PageView';
import OrderItem from '../../components/shared/Other/OrderItem';
import ListSeparator from '../../components/shared/UI/ListSeparator';

import { DeptorContext, DeptorsContext } from '../../context/DeptorsContext';
import NewOutsideOrder from '../../components/outside/NewOutsideOrder';

const DeptorView: React.FC = () => {
  const { id } = useParams();

  const [modalIsVisible, setModalIsVisible] = React.useState<boolean>(false);

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
      modal={<NewOutsideOrder closeModal={() => setModalIsVisible(false)} />}
      modalIsVisible={modalIsVisible}
      onAddNew={() => setModalIsVisible(true)}
      setInvisible={(visibility) => setModalIsVisible(visibility)}
      entries={orders!}
    />
  );
};

export default DeptorView;
