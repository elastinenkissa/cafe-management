import React from 'react';
import { FlatList } from 'react-native';

import ListItem from '../../components/shared/General/ListItem';
import ManagementNew from '../../components/settings/ManagementNew';

import { Employee } from '../../util/types/employee';

import employeeService from '../../util/services/employeeService';

import { UserContext, UserContextType } from '../../util/context/UserContext';

import { errorLogger } from '../../util/logger/errorLogger';

const Employees: React.FC = () => {
  const [employees, setEmployees] = React.useState<Array<Employee>>();

  const { user } = React.useContext<UserContextType>(UserContext);

  const fetchEmployees = async () => {
    try {
      const fetchedEmployees = await employeeService.getAll(user?.cafe.id!);
      setEmployees(
        fetchedEmployees.filter((employee) => employee.id !== user?.id)
      );
    } catch (error: any) {
      errorLogger(error);
    }
  };

  React.useEffect(() => {
    fetchEmployees();
  }, []);

  const removeEmployeeHandler = () => {
    return;
  };

  return (
    <ManagementNew modalContent={<></>}>
      <FlatList
        data={employees}
        renderItem={({ item }) => (
          <ListItem
            onRemove={removeEmployeeHandler}
            item={item}
            key={item.id}
          />
        )}
      />
    </ManagementNew>
  );
};

export default Employees;
