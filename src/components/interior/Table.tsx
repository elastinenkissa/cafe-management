import React from 'react';
import { StyleSheet } from 'react-native';

import Link from '../shared/UI/Link';

import { TableContext, TablesContext } from '../../util/context/TablesContext';

interface TableProps {
  id: string;
}

const Table: React.FC<TableProps> = (props) => {
  const { tables } = React.useContext<TableContext>(TablesContext);

  const table = tables.find((table) => table.id === props.id);

  const tableColor = table?.orders?.length === 0 ? '#B0C4DE' : '#93E9BE';

  const styles = StyleSheet.create({
    table: {
      borderWidth: 3,
      borderColor: tableColor,
      height: 50,
      width: 50,
      borderRadius: 25
    }
  });
 
  return (
    <Link
      to={`/cafe/${props.id}`}
      style={styles.table}
      background={tableColor}
    />
  );
};

export default Table;
