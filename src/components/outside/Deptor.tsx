import React from 'react';

import ListItem from '../shared/Other/ListItem';

import { DeptorContext, DeptorsContext } from '../../context/DeptorsContext';

import { Deptor as DeptorType } from '../../util/types/deptor';
import Link from '../shared/UI/Link';

interface DeptorProps {
  item: DeptorType;
  id: string;
}

const Deptor: React.FC<DeptorProps> = (props) => {
  const { removeDeptor } = React.useContext<DeptorContext>(DeptorsContext);

  const removeDeptorHandler = () => {
    removeDeptor(props.id);
  };

  return (
    <Link to={props.id} background={'lightgrey'}>
      <ListItem item={props.item} onRemove={removeDeptorHandler} />
    </Link>
  );
};

export default Deptor;
