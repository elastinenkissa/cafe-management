import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { Employee } from '../../util/types/employee';

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
          <Button>Logs</Button>
          <Button>Manage employees</Button>
        </View>
      )}
    </View>
  );
};

export default Options;
