import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { Employee } from '../../util/types/employee';
import Link from '../../components/shared/UI/Link';

const Options: React.FC = () => {
  const employee: Employee = {
    id: Math.random().toString(),
    name: 'Max Mustermann',
    owner: true,
    token: 'bearer blablablablabla'
  };
  return (
    <View>
      <Button>Logout</Button>
      {employee.owner && (
        <View>
          <Link text="Logs" to="/options/logs" background="black" />
          <Link
            text="Manage employees"
            to="/options/employees"
            background="black"
          />
        </View>
      )}
    </View>
  );
};

export default Options;
 