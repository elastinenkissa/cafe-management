import React from 'react';
import { StyleSheet, View } from 'react-native';

import AddFinalButton from '../UI/AddFinalButton';

interface NewItemProps {
  children: React.ReactNode;
  onAddItem: () => void;
  valid: boolean;
}

const NewItem: React.FC<NewItemProps> = (props) => {
  const addItemHandler = () => {
    setTimeout(() => {
      props.onAddItem();
    }, 1000);
  };
  return (
    <View style={styles.buttons}>
      {props.children}
      <AddFinalButton valid={props.valid} onAdd={addItemHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    margin: 40,
    marginTop: '40%',
    backgroundColor: 'white'
  }
});

export default NewItem;
