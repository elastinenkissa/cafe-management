import React from 'react';
import { FlatList, View } from 'react-native';

import ManagementListItem from '../../components/settings/ManagementListItem';

import { Employee } from '../../util/types/employee';
import employeeService from '../../util/services/employeeService';

import { UserContext, UserContextType } from '../../util/context/UserContext';

const Employees: React.FC = () => {
  const [employees, setEmployees] = React.useState<Array<Employee>>();

  const { user } = React.useContext<UserContextType>(UserContext);

  const fetchEmployees = async () => {
    try {
      const fetchedEmployees = await employeeService.getAll(user?.cafe.id!);
      setEmployees(fetchedEmployees);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  React.useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <View>
      <FlatList
        data={employees}
        renderItem={({ item }) => (
          <ManagementListItem item={item} key={item.id} />
        )}
      />
    </View>
  );
};

export default Employees;
