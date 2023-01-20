import React from 'react';
import { StyleSheet } from 'react-native';
import { TableContext, TablesContext } from '../../context/TablesContext';
import Link from '../shared/UI/Link';

interface TableProps {
  id: number;
}

const Table: React.FC<TableProps> = (props) => {
  const { tables } = React.useContext<TableContext>(TablesContext);
  const table = tables.find((table) => table.id === props.id);

  const tableColor = table?.orders?.length === 0 ? 'grey' : '#93E9BE';

  const styles = StyleSheet.create({
    table: {
      borderWidth: 3,
      borderColor: tableColor,
      height: 50,
      width: 50,
      borderRadius: 25,
    }
  });

  return (
    <Link
      to={`/tables/${props.id}`}
      style={styles.table}
      background={tableColor}
    />
  );
};

export default Table;
