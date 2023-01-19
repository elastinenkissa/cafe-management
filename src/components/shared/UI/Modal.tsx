import {
  Modal as NativeModal,
  Pressable,
  StyleSheet,
  View
} from 'react-native';

interface ModalProps {
  visible: boolean;
  setInvisible: (value: boolean) => void;
  children?: JSX.Element | Array<JSX.Element>;
}

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <NativeModal
      visible={props.visible}
      onRequestClose={() => props.setInvisible(false)}
      transparent
    >
      <Pressable onPress={() => props.setInvisible(false)}>
        <View style={styles.backdrop}>{props.children}</View>
      </Pressable>
    </NativeModal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%'
  }
});

export default Modal;
