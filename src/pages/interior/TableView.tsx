import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useParams } from 'react-router-native';

import OrderItem from '../../components/interior/OrderItem';
import AddNewButton from '../../components/shared/UI/AddNewButton';
import NewOrder from '../../components/interior/NewOrder';

import { TableContext, TablesContext } from '../../context/TablesContext';

const TableView: React.FC = () => {
  const { id } = useParams<string>();

  const [modalIsVisible, setModalIsVisible] = React.useState<boolean>(false);

  const { tables } = React.useContext<TableContext>(TablesContext);

  const orders = tables.find((table) => table.id.toString() === id)?.orders;

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={orders}
          renderItem={({ item }) => <OrderItem item={item} />}
          keyExtractor={(item) => item.item}
        />
      </View>
      <NewOrder
        visible={modalIsVisible}
        setVisible={() => setModalIsVisible(false)}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>
          Total:{' '}
          {orders?.reduce(
            (accumulator, current) => accumulator + current.price,
            0
          )}{' '}
          KM
        </Text>
        <AddNewButton onPress={() => setModalIsVisible(true)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '85%',
    justifyContent: 'space-between'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  total: {
    fontSize: 18
  }
});

export default TableView;
