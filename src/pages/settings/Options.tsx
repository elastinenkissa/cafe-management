import { View } from 'react-native';
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
    <View>
      <Button>Logout</Button>
      <Link text="Logs" to="/options/logs" background="black" />
      {employee.isOwner && (
        <View>
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
