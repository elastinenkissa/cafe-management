import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useParams } from 'react-router-native';

import NewItem from '../shared/General/NewItem';

import {
  DeptorContext,
  DeptorsContext
} from '../../util/context/DeptorsContext';

interface NewDeptorProps {
  closeModal: () => void;
  transferMode: boolean;
}

const NewDeptor: React.FC<NewDeptorProps> = (props) => {
  const [name, setName] = React.useState<string>('');

  const tableId = useParams().id;

  const { addDeptor, transferOrders } =
    React.useContext<DeptorContext>(DeptorsContext);

  const addDeptorHandler = () => {
    if (name.length === 0) {
      return;
    }

    props.closeModal();

    if (props.transferMode) {
      return transferOrders(name, tableId!);
    }

    addDeptor(name);
  };

  return (
    <NewItem onAddItem={addDeptorHandler}>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
    </NewItem>
  );
};

const styles = StyleSheet.create({
  buttons: {
    margin: 40,
    marginTop: '40%',
    backgroundColor: 'white'
  },
  input: {
    height: 50,
    padding: 5,
    fontSize: 20
  }
});

export default NewDeptor;
