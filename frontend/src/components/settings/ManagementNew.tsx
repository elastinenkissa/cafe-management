import React from 'react';

import Modal, { ModalRef } from '../shared/UI/Modal';
import SettingsLayout from './SettingsLayout';
import AddNewButton from '../shared/UI/AddNewButton';

interface ManagementNewProps {
  children: React.ReactNode;
  modalContent: JSX.Element;
}

type ManagementNewRef = ModalRef;

// eslint-disable-next-line react/display-name
const ManagementNew = React.forwardRef<
  ManagementNewRef | undefined,
  ManagementNewProps
>((props, ref) => {
  const modalRef = React.useRef<ModalRef>();

  React.useImperativeHandle(ref, () => {
    return {
      setVisible: modalRef.current?.setVisible!,
      setInvisible: modalRef.current?.setInvisible!
    };
  });

  return (
    <SettingsLayout>
      {props.children}
      <Modal ref={modalRef}>{props.modalContent}</Modal>
      <AddNewButton onAdd={() => modalRef.current?.setVisible()} />
    </SettingsLayout>
  );
});

export default ManagementNew;
