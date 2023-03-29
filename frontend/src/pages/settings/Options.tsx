import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Employee } from '../../util/types/employee';
import Link from '../../components/shared/UI/Link';
import { UserContext, UserContextType } from '../../util/context/UserContext';

const Options: React.FC = () => {
  const employee: Employee = {
    id: Math.random().toString(),
    name: 'Max Mustermann',
    isOwner: true,
    token: 'bearer blablablablabla'
  };

  const { user } = React.useContext<UserContextType>(UserContext);
  return (
    <View style={styles.container}>
      <View style={styles.links}>
        <Link text="Logs" to="/options/logs" background="black" />
        {employee.isOwner && (
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
  links: {}
});

export default Options;
