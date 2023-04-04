import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { useNavigate } from 'react-router-native';

import LoginButton from '../../components/settings/LoginButton';
import Input from '../../components/shared/UI/Input';

import { useLogin } from '../../util/hooks/useLogin';

import { UserContext, UserContextType } from '../../util/context/UserContext';

import employeeService from '../../util/services/employeeService';
import cafeService from '../../util/services/cafeService';

import { errorLogger } from '../../util/logger/errorLogger';

interface LoginProps {
  loginType: string;
  onExit: () => void;
}

const Login: React.FC<LoginProps> = (props) => {
  const [formIsValid, setFormIsValid] = React.useState<boolean>(false);

  const { setUser } = React.useContext<UserContextType>(UserContext);

  const redirect = useNavigate();

  const loginHandler = async () => {
    if (props.loginType === 'Login') {
      try {
        const user = await employeeService.login(formData);
        setUser(user);

        setTimeout(() => {
          redirect('/cafe');
        }, 1000);
      } catch (error: any) {
        errorLogger(error);
      }
    }

    if (props.loginType === 'Register') {
      try {
        await employeeService.signUp(formData);

        const user = await employeeService.login(formData);
        setUser(user);

        await cafeService.createCafe(formData, user);

        setTimeout(() => {
          redirect('/cafe');
        }, 1000);
      } catch (error: any) {
        errorLogger(error);
      }
    }
  };

  const formData = useLogin();

  React.useEffect(() => {
    let valid = true;

    for (let field in formData) {
      if (field.length === 0) {
        valid = false;
      }
    }
    setFormIsValid(valid);
  }, [formData]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.inputs}>
          {props.loginType === 'Register' && (
            <Input
              placeholder="Name"
              style={styles.input}
              value={formData.name}
              onChange={formData.setName}
            />
          )}
          <Input
            placeholder="Username"
            style={styles.input}
            value={formData.username}
            onChange={formData.setUsername}
          />
          <Input
            placeholder="Password"
            style={styles.input}
            value={formData.password}
            onChange={formData.setPassword}
            isPassword
          />
          {props.loginType === 'Register' && (
            <>
              <Input
                placeholder="Cafe name"
                style={styles.input}
                value={formData.cafeName}
                onChange={formData.setCafeName}
              />
              <Input
                placeholder="Cafe currency abbreviation/symbol"
                style={styles.input}
                value={formData.cafeCurrency}
                onChange={formData.setCafeCurrency}
              />
            </>
          )}
          <LoginButton
            loginType={props.loginType}
            onLogin={loginHandler}
            valid={formIsValid}
          />
        </View>
      </ScrollView>
      <View style={styles.cancel}>
        <PaperButton
          onPress={props.onExit}
          icon={{
            uri: 'https://th.bing.com/th/id/R.c63ac7690d2911f66419206dce02c142?rik=su2XbdpSJOeOLA&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f4%2fCancel-PNG-Clipart-180x180.png&ehk=Hvowxm4TCRFx4RYkpRmf5EtRwvBM3pvp6IE9EGrL3A8%3d&risl=&pid=ImgRaw&r=0'
          }}
        >
          {' '}
        </PaperButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    padding: 40,
    backgroundColor: 'white',
    zIndex: 1,
    alignItems: 'center',
    marginTop: 110,
    justifyContent: 'space-between'
  },
  inputs: {
    width: '100%',
    alignItems: 'center'
  },
  input: {
    marginBottom: 20,
    width: 350
  },
  cancel: { marginLeft: 15, marginTop: 25 },
  scroll: { justifyContent: 'space-between' }
});

export default Login;
