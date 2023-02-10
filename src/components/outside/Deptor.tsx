import React from 'react';

import ListItem from '../shared/General/ListItem';

import {
  DeptorContext,
  DeptorsContext
} from '../../util/context/DeptorsContext';

import { Deptor as DeptorType } from '../../util/types/deptor';
import Link from '../shared/UI/Link';
import AccessibleListItem from '../shared/General/AccessibleListItem';

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

  const changeToPaidHandler = (): void => {
    changeDeptorToPaid(props.id);
  };
 
  return (
    <AccessibleListItem>
      
    </AccessibleListItem>
  );
};

export default Deptor;
