import React from 'react';

import NewItem from '../shared/General/NewItem';
import Input from '../shared/UI/Input';

import employeeService from '../../util/services/employeeService';

import { UserContext, UserContextType } from '../../util/context/UserContext';

import { Employee } from '../../util/types/employee';
import { errorLogger } from '../../util/logger/errorLogger';

interface NewEmployeeProps {
  onCreateEmployee: (employee: Employee) => void;
  closeModal: () => void;
}

const NewEmployee: React.FC<NewEmployeeProps> = (props) => {
  const [name, setName] = React.useState<string>('');
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const { user } = React.useContext<UserContextType>(UserContext);

  const createEmployeeHandler = async () => {
    try {
      const newEmployee = await employeeService.createNew(
        { name, username, password },
        user!
      );
      props.onCreateEmployee(newEmployee);
      props.closeModal();
    } catch (error: any) {
      errorLogger(error);
    }
  };

  return (
    <NewItem
      onAddItem={createEmployeeHandler}
      valid={name.length > 0 && username.length > 0 && password.length > 0}
    >
      <Input placeholder="Employee name" value={name} onChange={setName} />
      <Input
        placeholder="Employee username"
        value={username}
        onChange={setUsername}
      />
      <Input
        placeholder="Employee password"
        value={password}
        onChange={setPassword}
      />
    </NewItem>
  );
};

export default NewEmployee;
