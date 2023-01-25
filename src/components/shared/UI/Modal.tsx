import React from 'react';
import {
  Modal as NativeModal,
  Pressable,
  StyleSheet,
  View
} from 'react-native';

interface ModalProps {
  children?: JSX.Element | Array<JSX.Element> | boolean;
}

export interface ModalRef {
  setVisible: () => void;
  setInvisible: () => void;
}

const Modal = React.forwardRef<ModalRef | undefined, ModalProps>(
  (props, ref) => {
    const [modalIsVisible, setModalIsVisible] = React.useState<boolean>(false);

    const setInvisible = (): void => {
      setModalIsVisible(false);
    };

    const setVisible = (): void => {
      setModalIsVisible(true);
    };

    React.useImperativeHandle(ref, () => {
      return {
        setInvisible,
        setVisible
      };
    });

    return (
      <NativeModal
        visible={modalIsVisible}
        onRequestClose={setInvisible}
        transparent
      >
        <Pressable onPress={setInvisible}>
          <View style={styles.backdrop}>{props.children}</View>
        </Pressable>
      </NativeModal>
    );
  }
);

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%'
  }
});

export default Modal;
