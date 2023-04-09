import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import SettingsLayout from '../../components/settings/SettingsLayout';
import AddNewButton from '../../components/shared/UI/AddNewButton';
import ListSeparator from '../../components/shared/UI/ListSeparator';
import RemoveTableButton from '../../components/settings/RemoveTableButton';

import { Table } from '../../util/types/table';

import tableService from '../../util/services/tableService';

import { UserContext, UserContextType } from '../../util/context/UserContext';

import { useTablesOrDeptors } from '../../util/hooks/useTablesOrDeptors';

const TablesManagement: React.FC = () => {
  const { user } = React.useContext<UserContextType>(UserContext);

  const { tablesOrDeptors, setTablesOrDeptors } =
    useTablesOrDeptors<Table>(tableService);

  const removeTableHandler = async () => {
    const tableId = tablesOrDeptors![tablesOrDeptors!.length - 1].id;

    try {
      await tableService.removeOne(user!, tableId);
      setTablesOrDeptors((prevTables) =>
        prevTables?.filter((table) => table.id !== tableId)
      );
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  const addTableHandler = async () => {
    const newTable = await tableService.addNew(user!);
    setTablesOrDeptors((prevTables) => prevTables?.concat(newTable));
  };

  return (
    <SettingsLayout>
      <FlatList
        data={tablesOrDeptors}
        renderItem={({ item }) => (
          <Text key={item.id} style={styles.tableName}>
            {item.name}
          </Text>
        )}
        ItemSeparatorComponent={ListSeparator}
      />
      <View style={styles.buttons}>
        <AddNewButton onAdd={addTableHandler} />
        <RemoveTableButton onRemove={removeTableHandler} />
      </View>
    </SettingsLayout>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  tableName: { fontSize: 18, color: 'white', padding: 20, paddingLeft: 25 }
});

export default TablesManagement;
