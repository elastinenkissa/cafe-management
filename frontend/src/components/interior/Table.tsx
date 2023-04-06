import React from 'react';

import AccessibleListItem from '../shared/General/AccessibleListItem';

import { UserContext, UserContextType } from '../../util/context/UserContext';

import { Table as TableType } from '../../util/types/table';

import tableService from '../../util/services/tableService';

import { errorLogger } from '../../util/logger/errorLogger';

interface TableProps {
  item: TableType;
  id: string;
  onRemoveOrders: () => void;
}

const Table: React.FC<TableProps> = (props) => {
  const { user } = React.useContext<UserContextType>(UserContext);

  const changeTableToPaidHandler = async () => {
    try {
      await tableService.removeOrders(props.id, user!);
      props.onRemoveOrders();
    } catch (error: any) {
      errorLogger(error);
    }
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
