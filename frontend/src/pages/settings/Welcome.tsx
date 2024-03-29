import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import LoginChoiceButton from '../../components/settings/LoginChoiceButton';
import Login from './Login';

const Welcome: React.FC = () => {
  const [loginType, setLoginType] = React.useState<string | undefined>();

  const loginTypeHandler = (loginTypeParam: string) => {
    setLoginType(loginTypeParam);
  };

  return (
    <View style={styles.container}>
      {loginType && (
        <Login onExit={() => setLoginType(undefined)} loginType={loginType} />
      )}
      <Image
        source={require('../../../assets/icon.png')}
        style={styles.image}
      />
      <View style={styles.buttons}>
        <LoginChoiceButton loginType="Login" onPress={loginTypeHandler} />
        <Text style={{ opacity: 0.5, fontSize: 16 }}>Or</Text>
        <LoginChoiceButton loginType="Register" onPress={loginTypeHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  image: { width: 300, height: 300 },
  buttons: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 150
  }
});

export default Welcome;
