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
  const { removeDeptor, changeDeptorToPaid } =
    React.useContext<DeptorContext>(DeptorsContext);

  const removeDeptorHandler = (): void => {
    removeDeptor(props.id);
  };

  const changeDeptorToPaidHandler = (): void => {
    changeDeptorToPaid(props.id);
  };

  return (
    <AccessibleListItem
      onChangeToPaid={changeDeptorToPaidHandler}
      onRemoveItem={removeDeptorHandler}
      link={props.id}
      item={props.item}
    />
  );
};

export default Deptor;
