import React from 'react';
import { FlatList, View } from 'react-native';
import axios, { CancelTokenSource } from 'axios';

import ListItem from '../../components/shared/General/ListItem';
import ManagementNew from '../../components/settings/ManagementNew';
import NewEmployee from '../../components/settings/NewEmployee';

import { Employee } from '../../util/types/employee';
import { ModalRef } from '../../components/shared/UI/Modal';

import employeeService from '../../util/services/employeeService';

import { UserContext, UserContextType } from '../../util/context/UserContext';

import { errorLogger } from '../../util/logger/errorLogger';

const Employees: React.FC = () => {
  const [employees, setEmployees] = React.useState<Array<Employee>>();

  const modalRef = React.useRef<ModalRef>();

  const { user } = React.useContext<UserContextType>(UserContext);

  const fetchEmployees = async (cancelToken: CancelTokenSource) => {
    try {
      const fetchedEmployees = await employeeService.getAll(
        user?.cafe.id!,
        cancelToken
      );
      setEmployees(
        fetchedEmployees.filter((employee) => employee.id !== user?.id)
      );
    } catch (error: any) {
      errorLogger(error);
    }
  };

  React.useEffect(() => {
    const source = axios.CancelToken.source();

    fetchEmployees(source);

    return () => {
      source.cancel();
    };
  }, []);

  const removeEmployeeHandler = async (id: string) => {
    await employeeService.removeOne(id, user!);
    setEmployees((prevEmployees) =>
      prevEmployees?.filter((employee) => employee.id !== id)
    );
  };

  const addEmployeeHandler = (newEmployee: Employee) => {
    setEmployees((prevEmployees) => prevEmployees?.concat(newEmployee));
  };

  return (
    <ManagementNew
      ref={modalRef}
      modalContent={
        <NewEmployee
          onCreateEmployee={addEmployeeHandler}
          closeModal={() => modalRef.current?.setInvisible()}
        />
      }
    >
      <FlatList
        data={employees}
        renderItem={({ item }) => (
          <View style={{ padding: 20 }}>
            <ListItem
              onRemove={() => removeEmployeeHandler(item.id)}
              item={item}
              key={item.id}
            />
          </View>
        )}
      />
    </ManagementNew>
  );
};

export default Employees;
