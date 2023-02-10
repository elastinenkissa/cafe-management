import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocation } from 'react-router-native';

import Modal, { ModalRef } from '../UI/Modal';
import NewEntryFooter from './NewEntryFooter';

import { Order } from '../../../util/types/order';
import NewCafeOrder from '../../interior/NewCafeOrder';
import NewOutsideOrder from '../../outside/NewOutsideOrder';
import NewDeptor from '../../outside/NewDeptor';

export interface EntryType {
  entries?: Array<Order>;
  outside?: boolean;
}

interface PageViewProps extends EntryType {
  list: JSX.Element;
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
 
  const checkPathname = () => {
    if (pathname.startsWith('/cafe')) {
      return <NewCafeOrder closeModal={closeModalHandler} />;
    }
    if (pathname === '/outside') {
      return <NewDeptor closeModal={closeModalHandler} />;
    } else {
      return <NewOutsideOrder closeModal={closeModalHandler} />;
    }
  };

  return (
    <View style={styles.container}>
      <View>{props.list}</View>
      <Modal ref={modalRef}>{checkPathname()}</Modal>
      <NewEntryFooter
        onPress={newEntryHandler}
        entries={props.entries}
        outside={props.outside}
      />
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
