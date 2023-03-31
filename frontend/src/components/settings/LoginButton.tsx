import React from 'react';
import { StyleSheet } from 'react-native';

import Button from '../shared/UI/Button';
import { ActivityIndicator } from 'react-native-paper';

interface LoginButtonProps {
  loginType: string;
  onLogin: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = (props) => {
  const [pressed, setPressed] = React.useState<boolean>(false);

  const styles = StyleSheet.create({
    buttonText: {
      backgroundColor: pressed ? '#888888' :'#272a31',
      color: 'white',
      padding: 15,
      borderRadius: 2,
      width: 350,
      textAlign: 'center',
      fontSize: 15,
    }
  });

  const loginHandler = () => {
    setPressed(true);
    props.onLogin();
    setTimeout(() => {
      setPressed(false);
    }, 2000);
  };

  return (
    <Button
      touchOpacity={0.9}
      containerStyle={undefined}
      textStyle={styles.buttonText}
      onPress={loginHandler}
      disabled={pressed}
    >
      {pressed ? <ActivityIndicator size={16} color="white" /> : props.loginType}
    </Button>
  );
};

export default LoginButton;
