import React from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { useLocation, useNavigate, useParams } from 'react-router-native';

import Modal, { ModalRef } from '../UI/Modal';
import NewEntryFooter from './NewEntryFooter';
import NewCafeOrder from '../../interior/NewCafeOrder';
import NewOutsideOrder from '../../outside/NewOutsideOrder';
import NewDeptor from '../../outside/NewDeptor';

import { Order } from '../../../util/types/order';
import { Deptor } from '../../../util/types/deptor';

import {
  UserContext,
  UserContextType
} from '../../../util/context/UserContext';
import orderService from '../../../util/services/orderService';

export interface EntryType {
  entries?: Array<Order>;
  outside?: boolean;
}

interface PageViewProps extends EntryType {
  list: JSX.Element;
  onAddOrder?: (order: Order) => void;
  onAddDeptor?: (deptor: Deptor) => void;
}

const PageView: React.FC<PageViewProps> = (props) => {
  const modalRef = React.useRef<ModalRef>();

  const { id } = useParams();
  const redirect = useNavigate();

  const { user } = React.useContext<UserContextType>(UserContext);

  const [transferMode, setTransferMode] = React.useState<boolean>(false);

  const { pathname } = useLocation();

  const transferHandler = () => {
    if (props.entries?.length === 0) {
      return;
    }
    setTransferMode(true);
    modalRef.current!.setVisible();
  };

  const addDeptorHandler = async (deptor: Deptor) => {
    props.onAddDeptor && props.onAddDeptor!(deptor);

    if (transferMode) {
      await orderService.transferOrders(id!, deptor.id, user!);
      redirect('/outside');
    }
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
        <NewDeptor
          onAddDeptor={addDeptorHandler}
          closeModal={closeModalHandler}
          transferMode={transferMode}
        />
      );
    }
    if (pathname.startsWith('/cafe')) {
      return (
        <NewCafeOrder
          onAddOrder={(order: Order) => props.onAddOrder!(order)}
          closeModal={closeModalHandler}
        />
      );
    } else {
      return (
        <NewOutsideOrder
          closeModal={closeModalHandler}
          onAddOrder={(order: Order) => props.onAddOrder!(order)}
        />
      );
    }
  };

  return (
    <KeyboardAvoidingView
      enabled={false}
      behavior={'height'}
      style={styles.container}
    >
      <View style={styles.list}>{props.list}</View>
      <Modal ref={modalRef}>{checkPathname()}</Modal>
      <NewEntryFooter
        onPress={newEntryHandler}
        entries={props.entries}
        outside={props.outside}
        onTransfer={transferHandler}
        pathname={pathname}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 29,
    height: '85%',
    justifyContent: 'space-evenly'
  },
  list: {
    height: '90%',
    paddingBottom: 25
  }
});

export default PageView;
