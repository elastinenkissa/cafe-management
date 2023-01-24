import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import AddFinalButton from '../shared/UI/AddFinalButton';

import { DeptorContext, DeptorsContext } from '../../util/context/DeptorsContext';

interface NewDeptorProps {
  closeModal: () => void;
}

const NewDeptor: React.FC<NewDeptorProps> = (props) => {
  const [name, setName] = React.useState<string>('');

  const { addDeptor } = React.useContext<DeptorContext>(DeptorsContext);

  const addDeptorHandler = () => {
    if (name.length === 0) {
      return;
    }
    addDeptor(name);
    props.closeModal();
  };

  return (
    <View style={styles.buttons}>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <AddFinalButton onAdd={addDeptorHandler} />
    </View>
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
