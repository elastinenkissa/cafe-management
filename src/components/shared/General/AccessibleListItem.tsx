import React from 'react';

import Link from '../UI/Link';
import ListItem from './ListItem';
import { Deptor } from '../../../util/types/deptor';
import { Table } from '../../../util/types/table';

interface AccessibleListItemProps {
  id: string;
  item: Deptor | Table
}
 
const AccessibleListItem: React.FC<AccessibleListItemProps> = (props) => {
  const [pressed, setPressed] = React.useState<boolean>(false);

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

export default AccessibleListItem;
