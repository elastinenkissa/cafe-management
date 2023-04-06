import React from 'react';

import AccessibleListItem from '../shared/General/AccessibleListItem';

import { Deptor as DeptorType } from '../../util/types/deptor';

import deptorService from '../../util/services/deptorService';

import { UserContext, UserContextType } from '../../util/context/UserContext';

import { errorLogger } from '../../util/logger/errorLogger';

interface DeptorProps {
  item: DeptorType;
  id: string;
  onRemove: () => void;
}

const Deptor: React.FC<DeptorProps> = (props) => {
  const { user } = React.useContext<UserContextType>(UserContext);

  const removeDeptorHandler = async () => {
    try {
      await deptorService.removeOne(props.id, user!);
      props.onRemove();
    } catch (error: any) {
      errorLogger(error);
    }
  };

  return (
    <AccessibleListItem
      onMarkAsPaid={removeDeptorHandler}
      link={props.id}
      item={props.item}
    />
  );
};

export default Deptor;
