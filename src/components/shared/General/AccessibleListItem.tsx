import React from 'react';

import Link from '../UI/Link';
import ListItem from './ListItem';
import { Deptor } from '../../../util/types/deptor';
import { Table } from '../../../util/types/table';

interface AccessibleListItemProps {
  link: string;
  item: Deptor | Table;
  onChangeToPaid: () => void;
  onRemoveItem?: () => void;
}

const AccessibleListItem: React.FC<AccessibleListItemProps> = (props) => {
  const [pressed, setPressed] = React.useState<boolean>(false);

  return (
    <Link
      to={props.link}
      background={'white'}
      setPressed={(isPressed) => setPressed(isPressed)}
    >
      <ListItem
        item={props.item}
        onRemove={props.onRemoveItem!}
        onChangeToPaid={props.onChangeToPaid}
        pressed={pressed}
      />
    </Link>
  );
};

export default AccessibleListItem;
