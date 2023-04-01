import React from 'react';
import { FlatList } from 'react-native';

import ListItem from '../../components/shared/General/ListItem';
import AddNewButton from '../../components/shared/UI/AddNewButton';
import Modal, { ModalRef } from '../../components/shared/UI/Modal';
import SettingsLayout from '../../components/settings/SettingsLayout';

import { Employee } from '../../util/types/employee';
import employeeService from '../../util/services/employeeService';
import { UserContext, UserContextType } from '../../util/context/UserContext';

const Employees: React.FC = () => {
  const [employees, setEmployees] = React.useState<Array<Employee>>();

  const modalRef = React.useRef<ModalRef>();

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

  const removeEmployeeHandler = () => {
    return;
  };

  return (
    <SettingsLayout>
      <>
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
        <Modal ref={modalRef}>
          <AddNewButton onPress={() => console.log('g')} />
        </Modal>
        <AddNewButton onPress={() => modalRef.current?.setVisible()} />
      </>
    </SettingsLayout>
  );
};

export default Employees;
