import React from 'react';

import ListItem from '../shared/General/ListItem';

import {
  DeptorContext,
  DeptorsContext
} from '../../util/context/DeptorsContext';

import { Deptor as DeptorType } from '../../util/types/deptor';
import Link from '../shared/UI/Link';

interface DeptorProps {
  item: DeptorType;
  id: string;
}

const Deptor: React.FC<DeptorProps> = (props) => {
  const [pressed, setPressed] = React.useState<boolean>(false);

  const { removeDeptor, changeDeptorToPaid } =
    React.useContext<DeptorContext>(DeptorsContext);

  const removeDeptorHandler = (): void => {
    removeDeptor(props.id);
  };

  const changeToPaidHandler = (): void => {
    changeDeptorToPaid(props.id);
  };

  return (
    <Link
      to={props.id}
      background={'white'}
      setPressed={(isPressed) => setPressed(isPressed)}
    >
      <ListItem
        item={props.item}
        onRemove={removeDeptorHandler}
        onChangeToPaid={changeToPaidHandler}
        pressed={pressed}
      />
    </Link>
  );
};

export default Deptor;
