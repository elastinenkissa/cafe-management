import React from 'react';

import AccessibleListItem from '../shared/General/AccessibleListItem';

import {
  DeptorContext,
  DeptorsContext
} from '../../util/context/DeptorsContext';

import { Deptor as DeptorType } from '../../util/types/deptor';

interface DeptorProps {
  item: DeptorType;
  id: string;
}

const Deptor: React.FC<DeptorProps> = (props) => {
  const { removeDeptor } = React.useContext<DeptorContext>(DeptorsContext);

  const removeDeptorHandler = (): void => {
    removeDeptor(props.id);
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
