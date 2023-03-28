import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TextInput, Button as PaperButton } from 'react-native-paper';

import Button from '../../components/shared/UI/Button';
import { useLogin } from '../../util/hooks/useLogin';
import axios, { AxiosResponse } from 'axios';
import { Employee } from '../../util/types/employee';
import { Cafe } from '../../util/types/cafe';
import { UserContext, UserContextType } from '../../util/context/UserContext';
import { useNavigate } from 'react-router-native';

interface LoginProps {
  loginType: string;
  onExit: () => void;
}

const Login: React.FC<LoginProps> = (props) => {
  const { setUser } = React.useContext<UserContextType>(UserContext);

  const redirect = useNavigate();

  const loginHandler = async () => {
    interface LoginData {
      username: string;
      password: string;
    }

    interface RegisterData extends LoginData {
      name: string;
    }

    interface CafeData {
      name: string;
      currency: string;
    }

    if (props.loginType === 'Login') {
    }

    if (props.loginType === 'Register') {
      await axios.post<Employee, AxiosResponse<Employee, any>, RegisterData>(
        'http://localhost:3000/api/employees/signup',
        {
          name: formData.name,
          username: formData.username,
          password: formData.password
        }
      );

      const userResponse = await axios.post<
        Employee,
        AxiosResponse<Employee, any>,
        LoginData
      >('http://localhost:3000/api/employees/login', {
        username: formData.username,
        password: formData.password
      });

      const user = userResponse.data;
      setUser(user);

      await axios.post<Cafe, AxiosResponse<Cafe, any>, CafeData>(
        'http://localhost:3000/api/cafe',
        {
          name: formData.cafeName,
          currency: formData.cafeCurrency
        },
        {
          headers: {
            Authorization: `bearer ${user.token}`
          }
        }
      );

      setTimeout(() => {
        redirect('/cafe');
      }, 2000);
    }
  };

  const formData = useLogin();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.inputs}>
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={formData.name}
            onChangeText={formData.setName}
          />
          <TextInput
            placeholder="Username"
            style={styles.input}
            value={formData.username}
            onChangeText={formData.setUsername}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            value={formData.password}
            onChangeText={formData.setPassword}
          />
          {props.loginType === 'Register' && (
            <>
              <TextInput
                placeholder="Cafe name"
                style={styles.input}
                value={formData.cafeName}
                onChangeText={formData.setCafeName}
              />
              <TextInput
                placeholder="Cafe currency abbreviation/symbol"
                style={styles.input}
                value={formData.cafeCurrency}
                onChangeText={formData.setCafeCurrency}
              />
            </>
          )}
          <Button
            touchOpacity={0.85}
            containerStyle={undefined}
            textStyle={styles.buttonText}
            onPress={loginHandler}
          >
            {props.loginType}
          </Button>
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
  buttonText: {
    backgroundColor: '#272a31',
    color: 'white',
    padding: 15,
    borderRadius: 2,
    width: 350,
    textAlign: 'center',
    fontSize: 15
  },
  cancel: { marginLeft: 15, marginTop: 25 },
  scroll: { justifyContent: 'space-between' }
});

export default Login;
