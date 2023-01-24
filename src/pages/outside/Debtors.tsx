import React from 'react';
import { FlatList } from 'react-native';

import PageView from '../../components/shared/Other/PageView';
import Deptor from '../../components/outside/Deptor';
import NewDeptor from '../../components/outside/NewDeptor';
import ListSeparator from '../../components/shared/UI/ListSeparator';

import { DeptorContext, DeptorsContext } from '../../util/context/DeptorsContext';

const Debtors: React.FC = () => {
  const { deptors } = React.useContext<DeptorContext>(DeptorsContext);

  const [modalIsVisible, setModalIsVisible] = React.useState<boolean>(false);

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
      modal={<NewDeptor closeModal={() => setModalIsVisible(false)} />}
      modalIsVisible={modalIsVisible}
      onAddNew={() => setModalIsVisible(true)}
      setInvisible={(visibility) => setModalIsVisible(visibility)}
    />
  );
};

export default Debtors;
