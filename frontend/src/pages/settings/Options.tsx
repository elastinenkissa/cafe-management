import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigate } from 'react-router-native';

import Link from '../../components/shared/UI/Link';
import SettingsLayout from '../../components/settings/SettingsLayout';

import { UserContext, UserContextType } from '../../util/context/UserContext';

const Options: React.FC = () => {
  const { user, logout } = React.useContext<UserContextType>(UserContext);

  const redirect = useNavigate();

  const logoutHandler = () => {
    logout();
    redirect('/');
  };

  return (
    <SettingsLayout>
      <>
        <View>
          <Link text="Logs" to="/options/logs" background="black" />
          {user?.id === user?.cafe.owner && (
            <View>
              <Link
                text="Manage employees"
                to="/options/employees"
                background="black"
              />
              <Link
                text="Manage cafe"
                to="/options/manage"
                background="black"
              />
            </View>
          )}
        </View>
        <View>
          <Text style={styles.welcome}>{user?.name}</Text>
          <TouchableOpacity>
            <Button textColor="grey" onPress={logoutHandler}>
              Logout
            </Button>
          </TouchableOpacity>
        </View>
      </>
    </SettingsLayout>
  );
};

const styles = StyleSheet.create({
  welcome: {
    color: 'white',
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 20,
    fontSize: 18
  }
});

export default Options;
