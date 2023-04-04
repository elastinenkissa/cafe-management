import React from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import Button from './Button';

interface ConfirmingButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  valid: boolean;
  style?: Object;
}

const ConfirmingButton: React.FC<ConfirmingButtonProps> = (props) => {
  const [pressed, setPressed] = React.useState<boolean>(false);

  const styles = StyleSheet.create({
    buttonText: {
      backgroundColor: pressed ? '#888888' : '#272a31',
      color: 'white',
      padding: 15,
      //   width: 350,
      textAlign: 'center',
      fontSize: 15
    }
  });

  const pressHandler = () => {
    if (!props.valid) {
      return;
    }
    
    setPressed(true);
    props.onPress();
    setTimeout(() => {
      setPressed(false);
    }, 2000);
  };

  return (
    <Button
      touchOpacity={0.9}
      containerStyle={undefined}
      textStyle={[styles.buttonText, props.style]}
      onPress={pressHandler}
      disabled={pressed}
    >
      {pressed ? <ActivityIndicator size={16} color="white" /> : props.children}
    </Button>
  );
};

export default ConfirmingButton;
