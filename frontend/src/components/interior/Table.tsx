import React from 'react';

import AccessibleListItem from '../shared/General/AccessibleListItem';

import { TableContext, TablesContext } from '../../util/context/TablesContext';

import { Table as TableType } from '../../util/types/table';

interface TableProps {
  item: TableType;
  id: string;
}

const Table: React.FC<TableProps> = (props) => {
  const { removeOrders } =
    React.useContext<TableContext>(TablesContext);

  const changeTableToPaidHandler = (): void => {
    removeOrders(props.id);
  };

  return (
    <AccessibleListItem
      item={props.item}
      link={`/cafe/${props.id}`}
      onMarkAsPaid={changeTableToPaidHandler}
    />
  );
};

export default Table;
