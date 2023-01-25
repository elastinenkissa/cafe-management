import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocation } from 'react-router-native';

import Modal, { ModalRef } from '../UI/Modal';
import NewEntryFooter from './NewEntryFooter';

import { Order } from '../../../util/types/order';
import NewCafeOrder from '../../interior/NewCafeOrder';
import NewOutsideOrder from '../../outside/NewOutsideOrder';

interface PageViewProps {
  list: JSX.Element;
  entries?: Array<Order>;
}

const PageView: React.FC<PageViewProps> = (props) => {
  const modalRef = React.useRef<ModalRef>();

  const { pathname } = useLocation();

  const newEntryHandler = () => {
    modalRef.current!.setVisible();
  };

  const closeModalHandler = () => {
    modalRef.current!.setInvisible();
  };

  return (
    <View style={styles.container}>
      <View>{props.list}</View>
      <Modal ref={modalRef}>
        {pathname.startsWith('/outside') ? (
          <NewOutsideOrder closeModal={closeModalHandler} />
        ) : (
          <NewCafeOrder closeModal={closeModalHandler} />
        )}
      </Modal>
      <NewEntryFooter onPress={newEntryHandler} entries={props.entries} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '85%',
    justifyContent: 'space-between'
  }
});

export default PageView;
