import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Employee } from '../../util/types/employee';
import Link from '../../components/shared/UI/Link';

const Options: React.FC = () => {
  const employee: Employee = {
    id: Math.random().toString(),
    name: 'Max Mustermann',
    isOwner: true,
    token: 'bearer blablablablabla'
  };
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
        <Button textColor="grey">Logout</Button>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    height: '80%',
    justifyContent: 'space-between'
  },
  links: {}
});

export default Options;
