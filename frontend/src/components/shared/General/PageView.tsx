import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useLocation } from 'react-router-native';

import Modal, { ModalRef } from '../UI/Modal';
import NewEntryFooter from './NewEntryFooter';

import { Order } from '../../../util/types/order';
import NewCafeOrder from '../../interior/NewCafeOrder';
import NewOutsideOrder from '../../outside/NewOutsideOrder';
import NewDeptor from '../../outside/NewDeptor';
import { Button } from 'react-native-paper';

export interface EntryType {
  entries?: Array<Order>;
  outside?: boolean;
}

interface PageViewProps extends EntryType {
  list: JSX.Element;
}

const PageView: React.FC<PageViewProps> = (props) => {
  const modalRef = React.useRef<ModalRef>();

  const [transferMode, setTransferMode] = React.useState<boolean>(false);

  const { pathname } = useLocation();

  const transferHandler = () => {
    if (props.entries?.length === 0) {
      return;
    }
    setTransferMode(true);
    modalRef.current!.setVisible();
  };

  const newEntryHandler = () => {
    setTransferMode(false);
    modalRef.current!.setVisible();
  };

  const closeModalHandler = () => {
    modalRef.current!.setInvisible();
  };

  const checkPathname = () => {
    if (pathname === '/outside' || transferMode === true) {
      return (
        <NewDeptor closeModal={closeModalHandler} transferMode={transferMode} />
      );
    }
    if (pathname.startsWith('/cafe')) {
      return <NewCafeOrder closeModal={closeModalHandler} />;
    } else {
      return <NewOutsideOrder closeModal={closeModalHandler} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.list}>{props.list}</View>
      <Modal ref={modalRef}>{checkPathname()}</Modal>
      <View style={styles.bottomContainer}>
        {pathname !== '/outside' && (
          <TouchableOpacity onPress={transferHandler}>
            <Button textColor="grey">Transfer to deptor</Button>
          </TouchableOpacity>
        )}
        <NewEntryFooter
          onPress={newEntryHandler}
          entries={props.entries}
          outside={props.outside}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '85%',
    justifyContent: 'space-around'
  },
  list: {
    height: '90%'
  },
  bottomContainer: {
    justifyContent: 'space-evenly'
  }
});

export default PageView;
