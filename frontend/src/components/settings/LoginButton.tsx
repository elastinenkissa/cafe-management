import { StyleSheet } from 'react-native';

import Button from '../shared/UI/Button';

interface LoginButtonProps {
  loginType: string;
  onPress: (loginType: string) => void;
}

const LoginButton: React.FC<LoginButtonProps> = (props) => {
  const styles = StyleSheet.create({
    text: {
      color: 'white',
      backgroundColor:
        props.loginType.toLowerCase() === 'register' ? '#20232a' : '#454850',
      padding: 12,
      width: 300,
      height: 55,
      textAlignVertical: 'center',
      textAlign: 'center',
    }
  });

  return (
    <Button
      touchOpacity={0.85}
      containerStyle={undefined}
      textStyle={styles.text}
      onPress={() => props.onPress(props.loginType)}
    >
      {props.loginType}
    </Button>
  );
};

export default LoginButton;
