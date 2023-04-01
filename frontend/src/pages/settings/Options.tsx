import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';

import Link from '../../components/shared/UI/Link';
import SettingsLayout from '../../components/settings/SettingsLayout';

import { UserContext, UserContextType } from '../../util/context/UserContext';

const Options: React.FC = () => {
  const { user } = React.useContext<UserContextType>(UserContext);

  return (
    <SettingsLayout>
      <>
        <View>
          <Text style={styles.welcome}>Welcome, {user?.name}</Text>
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
        <TouchableOpacity>
          <Button textColor="grey" onPress={() => console.log(user)}>
            Logout
          </Button>
        </TouchableOpacity>
      </>
    </SettingsLayout>
  );
};

const styles = StyleSheet.create({
  welcome: {
    color: 'white',
    alignSelf: 'center',
    marginBottom: 30
  }
});

export default Options;
