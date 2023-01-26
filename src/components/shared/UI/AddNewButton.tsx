import { StyleSheet } from 'react-native';

import Button from './Button';

interface AddNewProps {
  onPress: () => void;
}

const AddNewButton: React.FC<AddNewProps> = (props) => {
  return (
    <Button
      containerStyle={styles.new}
      textStyle={styles.plus}
      onPress={props.onPress}
    >
      ＋
    </Button>
  );
};

const styles = StyleSheet.create({
  new: {
    backgroundColor: '#ffa0b0',
    width: 50,
    height: 50,
    borderRadius: 100,
    textAlign: 'center',
    alignItems: 'center'
  },
  plus: {
    fontSize: 45,
    color: 'white'
  }
});

export default AddNewButton;
