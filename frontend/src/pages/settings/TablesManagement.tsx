import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import SettingsLayout from '../../components/settings/SettingsLayout';
import AddNewButton from '../../components/shared/UI/AddNewButton';
import ListSeparator from '../../components/shared/UI/ListSeparator';
import RemoveTableButton from '../../components/settings/RemoveTableButton';

import { Table } from '../../util/types/table';

import tableService from '../../util/services/tableService';

import { UserContext, UserContextType } from '../../util/context/UserContext';

import { errorLogger } from '../../util/logger/errorLogger';

const TablesManagement: React.FC = () => {
  const [tables, setTables] = React.useState<Array<Table>>();

  const { user } = React.useContext<UserContextType>(UserContext);

  const fetchTables = async () => {
    try {
      const fetchedTables = await tableService.getAll(user?.cafe.id!);
      setTables(fetchedTables);
    } catch (error: any) {
      errorLogger(error);
    }
  };

  React.useEffect(() => {
    fetchTables();
  }, []);

  const removeTableHandler = async () => {
    const tableId = tables![tables!.length - 1].id;

    try {
      await tableService.removeOne(user?.cafe.id!, tableId);
      setTables((prevTables) =>
        prevTables?.filter((table) => table.id !== tableId)
      );
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  const addTableHandler = async () => {
    const newTable = await tableService.addNew(user?.cafe.id!);
    setTables((prevTables) => prevTables?.concat(newTable));
  };

  return (
    <SettingsLayout>
        <FlatList
          data={tables}
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
  tableName: { fontSize: 18, color: 'white', padding: 20, paddingLeft: 25 },
});

export default TablesManagement;
