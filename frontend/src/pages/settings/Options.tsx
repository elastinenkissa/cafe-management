import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';

import Link from '../../components/shared/UI/Link';

import { UserContext, UserContextType } from '../../util/context/UserContext';

const Options: React.FC = () => {
  const { user } = React.useContext<UserContextType>(UserContext);
  return (
    <View style={styles.container}>
      <View style={styles.links}>
        <Text style={styles.welcome}>Welcome, {user?.name}</Text>
        <Link text="Logs" to="/options/logs" background="black" />
        {user?.id === user?.cafe.owner && (
          <View>
            <Link
              text="Manage employees"
              to="/options/employees"
              background="black"
            />
            <Link text="Manage cafe" to="/options/cafe" background="black" />
          </View>
        )}
      </View>
      <TouchableOpacity>
        <Button textColor="grey" onPress={() => console.log(user)}>
          Logout
        </Button>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    height: '80%',
    justifyContent: 'space-between'
  },
  links: {},
  welcome: {
    color: 'white',
    alignSelf: 'center',
    marginBottom: 30
  }
});

export default Options;
