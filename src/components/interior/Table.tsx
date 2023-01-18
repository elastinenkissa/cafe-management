import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { TableContext, TablesContext } from '../../context/TablesContext';
import Link from '../shared/UI/Link';

interface TableProps {
  id: number;
}

const Table: React.FC<TableProps> = (props) => {
  const { tables } = React.useContext<TableContext>(TablesContext);
  const table = tables.find((table) => table.id === props.id);

  const unpaidTable = table?.orders?.length === 0 ? 'black' : '#93E9BE';

  const styles = StyleSheet.create({
    table: {
      borderWidth: 2,
      borderColor: unpaidTable,
      height: 50,
      width: 50,
      borderRadius: 25
    }
  });

  return (
    <Link
      to={`/tables/${props.id}`}
      style={styles.table}
      background={unpaidTable}
    />
  );
};

export default Table;
