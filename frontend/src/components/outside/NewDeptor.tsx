import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import NewItem from '../shared/General/NewItem';

import {
  DeptorContext,
  DeptorsContext
} from '../../util/context/DeptorsContext';
import { useNavigate, useParams } from 'react-router-native';
import { TableContext, TablesContext } from '../../util/context/TablesContext';

interface NewDeptorProps {
  closeModal: () => void;
  transferMode: boolean;
}

const NewDeptor: React.FC<NewDeptorProps> = (props) => {
  const [name, setName] = React.useState<string>('');

  const { id } = useParams();

  // const navigate = useNavigate();

  const { addDeptor, transferOrders } =
    React.useContext<DeptorContext>(DeptorsContext);
  const { tables, removeOrders } =
    React.useContext<TableContext>(TablesContext);

  const transferingOrders = tables.find((table) => table.id === id)?.orders;

  const addDeptorHandler = () => {
    if (name.length === 0) {
      return;
    }

    const deptorId = addDeptor(name);

    if (props.transferMode) {
      // transferOrders(deptorId, transferingOrders!);
      removeOrders(id!);
    }

    props.closeModal();
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
