import React from 'react';
import { FlatList } from 'react-native';

import SettingsLayout from '../../components/settings/SettingsLayout';
import ListItem from '../../components/shared/General/ListItem';
import AddNewButton from '../../components/shared/UI/AddNewButton';
import ListSeparator from '../../components/shared/UI/ListSeparator';

import { Table } from '../../util/types/table';
import tableService from '../../util/services/tableService';
import { UserContext, UserContextType } from '../../util/context/UserContext';

const TablesManagement: React.FC = () => {
  const [tables, setTables] = React.useState<Array<Table>>();

  const { user } = React.useContext<UserContextType>(UserContext);

  const fetchTables = async () => {
    const fetchedTables = await tableService.getAll(user?.cafe.id!);
    setTables(fetchedTables);
  };

  React.useEffect(() => {
    fetchTables();
  }, []);

  const removeTableHandler = async (tableId: string) => {
    await tableService.removeOne(user?.cafe.id!, tableId);
    setTables((prevTables) =>
      prevTables?.filter((table) => table.id !== tableId)
    );
  };

  const addTableHandler = async () => {
    const newTable = await tableService.addNew(user?.cafe.id!);
    setTables((prevTables) => prevTables?.concat(newTable));
  };

  return (
    <SettingsLayout>
      <>
        <FlatList
          data={tables}
          renderItem={({ item }) => (
            <ListItem
              item={item}
              onRemove={() => removeTableHandler(item.id)}
              key={item.id}
            />
          )}
          ItemSeparatorComponent={ListSeparator}
        />
        <AddNewButton onPress={addTableHandler} />
      </>
    </SettingsLayout>
  );
};

export default TablesManagement;
