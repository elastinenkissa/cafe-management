import { StyleSheet } from 'react-native';

import Button from './Button';

interface ManageButtonProps {
  onPress: () => void;
  children: JSX.Element;
}

const ManageButton: React.FC<ManageButtonProps> = (props) => {
  return (
    <Button
      containerStyle={styles.new}
      textStyle={styles.sign}
      onPress={props.onPress}
      touchOpacity={0.4}
    >
      {props.children}
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
  sign: {
    fontSize: 45,
    color: 'white'
  }
});

export default ManageButton;
