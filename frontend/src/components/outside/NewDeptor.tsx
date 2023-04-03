import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigate, useParams } from 'react-router-native';

import NewItem from '../shared/General/NewItem';

import {
  DeptorContext,
  DeptorsContext
} from '../../util/context/DeptorsContext';
import Input from '../shared/UI/Input';

interface NewDeptorProps {
  closeModal: () => void;
  transferMode: boolean;
}

const NewDeptor: React.FC<NewDeptorProps> = (props) => {
  const [name, setName] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);

  const navigate = useNavigate();

  const id = useParams().id;

  const { addDeptor, transferOrders } =
    React.useContext<DeptorContext>(DeptorsContext);

  const inputHandler = (value: string) => {
    setName(value);
    if (value.length === 0) {
      return setError(true);
    }
    setError(false);
  };

  const addDeptorHandler = () => {
    if (name.length === 0) {
      return setError(true);
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
      <Input
        style={styles.input}
        value={name}
        onChange={inputHandler}
        placeholder="Deptor name"
        error={error}
      />
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
    height: 50
  }
});

export default NewDeptor;
