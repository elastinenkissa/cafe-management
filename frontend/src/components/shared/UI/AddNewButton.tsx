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
      touchOpacity={0.4}
    >
      ＋
    </Button> 
  );
};
 
const styles = StyleSheet.create({
  new: {
    backgroundColor: 'transparent',
    height: 50,
    textAlign: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  plus: {
    fontSize: 45,
    color: 'white'
  }
});

export default AddNewButton;
