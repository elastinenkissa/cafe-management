import React from 'react';

import AccessibleListItem from '../shared/General/AccessibleListItem';

import { TableContext, TablesContext } from '../../util/context/TablesContext';
import { Table as TableType } from '../../util/types/table';

interface TableProps {
  item: TableType;
  id: string;
}

const Table: React.FC<TableProps> = (props) => {
  const { tables, removeOrder } = React.useContext<TableContext>(TablesContext);
  const currentTable = tables.find((table) => table.id === props.id)!;
  const orders = currentTable.orders;

  const changeTableToPaidHandler = (): void => {
    orders.map((order) => {
      removeOrder(order.id!);
    });
  };

  return (
    <AccessibleListItem
      item={props.item}
      link={`/cafe/${props.id}`}
      onChangeToPaid={changeTableToPaidHandler}
    />
  );
};

export default Table;
