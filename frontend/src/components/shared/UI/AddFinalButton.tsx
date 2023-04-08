import React from 'react';
import { StyleSheet } from 'react-native';

import ConfirmingButton from './ConfirmingButton';

interface AddFinalButton {
  onAdd: () => void;
  valid: boolean;
}

const AddFinalButton: React.FC<AddFinalButton> = (props) => {
  return (
    <ConfirmingButton
      onPress={props.onAdd}
      style={styles.buttonText}
      valid={props.valid}
    >
      ADD
    </ConfirmingButton>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#27292c',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  }
});

export default AddFinalButton;
