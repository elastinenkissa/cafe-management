import React from 'react';
import { FlatList } from 'react-native';
import { useParams } from 'react-router-native';

import OrderItem from '../../components/interior/OrderItem';
import NewCafeOrder from '../../components/interior/NewCafeOrder';
import ListSeparator from '../../components/shared/UI/ListSeparator';
import PageView from '../../components/shared/Other/PageView';

import { TableContext, TablesContext } from '../../context/TablesContext';

const TableView: React.FC = () => {
  const { id } = useParams<string>();

  const [modalIsVisible, setModalIsVisible] = React.useState<boolean>(false);

  const { tables } = React.useContext<TableContext>(TablesContext);

  const orders = tables.find((table) => table.id.toString() === id)?.orders;

  return (
    <PageView
      list={
        <FlatList
          data={orders}
          renderItem={({ item }) => <OrderItem item={item} id={item.id!} />}
          keyExtractor={(item) => item.id!}
          ItemSeparatorComponent={ListSeparator}
        />
      }
      modal={<NewCafeOrder closeModal={() => setModalIsVisible(false)} />}
      onAddNew={() => setModalIsVisible(true)}
      entries={orders!}
      modalIsVisible={modalIsVisible}
      setInvisible={(visibility) => setModalIsVisible(visibility)}
    />
  );
};

export default TableView;
