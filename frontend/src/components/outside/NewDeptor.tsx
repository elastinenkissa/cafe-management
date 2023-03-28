import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useNavigate, useParams } from 'react-router-native';

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

  const navigate = useNavigate();

  const id = useParams().id;

  const { addDeptor, transferOrders } =
    React.useContext<DeptorContext>(DeptorsContext);

  const addDeptorHandler = () => {
    if (name.length === 0) {
      return;
    }

    props.closeModal();

    if (props.transferMode) {
      transferOrders(name, id!);
      return navigate(`/outside`);
    }

    addDeptor(name);
  };

  return (
    <NewItem onAddItem={addDeptorHandler}>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Deptor name" />
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
