import { StyleSheet, View } from 'react-native';

import Modal from '../UI/Modal';
import NewEntryFooter from './NewEntryFooter';

import { Order } from '../../../util/types/order';

interface PageViewProps {
  list: JSX.Element;
  modal: JSX.Element;
  modalIsVisible: boolean;
  setInvisible: (visibility: boolean) => void;
  onAddNew: () => void;
  entries: Array<Order>;
}

const PageView: React.FC<PageViewProps> = (props) => {
  return (
    <View style={styles.container}>
      <View>{props.list}</View>
      <Modal visible={props.modalIsVisible} setInvisible={props.setInvisible}>
        {props.modal}
      </Modal>
      <NewEntryFooter onPress={props.onAddNew} entries={props.entries} />
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
