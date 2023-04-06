import React from 'react';
import { StyleSheet } from 'react-native';

import NewItem from '../shared/General/NewItem';
import Input from '../shared/UI/Input';

import { Deptor } from '../../util/types/deptor';

import deptorService from '../../util/services/deptorService';

import { UserContext, UserContextType } from '../../util/context/UserContext';

import { errorLogger } from '../../util/logger/errorLogger';

interface NewDeptorProps {
  closeModal: () => void;
  onAddDeptor: (newDeptor: Deptor) => void;
  transferMode: boolean;
}

const NewDeptor: React.FC<NewDeptorProps> = (props) => {
  const [name, setName] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);

  const { user } = React.useContext<UserContextType>(UserContext);

  const inputHandler = (value: string) => {
    setName(value);
    if (value.length === 0) {
      return setError(true);
    }
    setError(false);
  };

  const addDeptorHandler = async () => {
    if (name.length === 0) {
      setError(true);
      return;
    }

    if (props.transferMode) {
      //transfer code
    }

    try {
      const newDeptor = await deptorService.addNew(user?.cafe.id!, name, user!);
      props.onAddDeptor(newDeptor);
      props.closeModal();
    } catch (error: any) {
      errorLogger(error);
    }
  };

  return (
    <NewItem
      onAddItem={addDeptorHandler}
      valid={name.length === 0 ? false : true}
    >
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
