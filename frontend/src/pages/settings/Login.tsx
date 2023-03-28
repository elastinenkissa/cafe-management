import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import Button from '../../components/shared/UI/Button';

interface LoginProps {
  loginType: string;
}

const Login: React.FC<LoginProps> = (props) => {
  return (
    <View style={styles.container}>
      <TextInput placeholder="Username" style={styles.input} />
      <TextInput placeholder="Password" style={styles.input} />
      {props.loginType === 'Register' && (
        <>
          <TextInput placeholder="Cafe name" style={styles.input} />
          <TextInput
            placeholder="Cafe currency abbreviation/symbol"
            style={styles.input}
          />
        </>
      )}
      <Button
        touchOpacity={0.85}
        containerStyle={undefined}
        textStyle={styles.buttonText}
        onPress={() => {}}
      >
        {props.loginType}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '110%',
    width: '100%',
    padding: 40,
    backgroundColor: 'white',
    zIndex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 50
  },
  input: {
    width: '100%'
  },
  buttonText: {
    backgroundColor: '#272a31',
    color: 'white',
    padding: 15,
    borderRadius: 2
  }
});

export default Login;
