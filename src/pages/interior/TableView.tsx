import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useParams } from 'react-router-native';

import { TablesContext } from '../../context/TablesContext';

const TableView: React.FC = () => {
  const { id } = useParams<string>();

  const tables = React.useContext(TablesContext).tables;

  const orders = tables.find((table) => table.id.toString() === id)?.orders;

  return (
    <View>
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <Text>
            {item.item} - {item.price} KM
          </Text>
        )}
        keyExtractor={(item) => item.item}
      />
    </View>
  );
};

export default TableView;
