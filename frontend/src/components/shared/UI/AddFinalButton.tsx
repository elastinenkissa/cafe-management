import { StyleSheet } from 'react-native';

import Button from './Button';

interface AddFinalButton {
  onAdd: () => void;
}

const AddFinalButton: React.FC<AddFinalButton> = (props) => {
  return (
    <Button
      containerStyle={styles.button}
      textStyle={styles.buttonText}
      onPress={props.onAdd}
      touchOpacity={0.93}
    >
      ADD
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#27292c',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  }
});

export default AddFinalButton;
