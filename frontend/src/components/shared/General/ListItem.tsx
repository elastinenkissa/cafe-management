import React from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Order } from '../../../util/types/order';
import { Deptor } from '../../../util/types/deptor';
import { Table } from '../../../util/types/table';

interface ListItemProps {
  onRemove: () => void;
  item: Order | Deptor | Table;
  pressed?: boolean;
  paid?: boolean;
}

const ListItem: React.FC<ListItemProps> = (props) => {
  const [paid, setPaid] = React.useState<boolean>(false);

  const isOrder = (): boolean => {
    return (props.item as Order).price !== undefined;
  };

  const statusFunction = () => {
    setPaid(true);
    props.onRemove();
    
    setTimeout(() => {
      setPaid(false);
    }, 3000);
  };

  const statusHandler = () => {
    if (isOrder()) {
      return props.onRemove();
    }
    Alert.alert(
      'Mark as paid',
      `This will remove all orders from ${props.item.name}`,
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: statusFunction
        }
      ]
    );
  };

  const styles = StyleSheet.create({
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    text: {
      fontSize: 18,
      color: props.pressed === true ? 'black' : 'white'
    },
    row: {
      flexDirection: 'row',
      alignItems: 'flex-end'
    },
    paid: {
      color: '#8FBC8F',
      fontWeight: '100',
      paddingLeft: 15
    },
    vacant: {
      color: 'cyan'
    }
  });

  return (
    <View style={styles.item}>
      <View style={styles.row}>
        <Text style={styles.text}>{props.item.name}</Text>
        {paid && <Text style={styles.paid}>PAID</Text>}
      </View>
      {!isOrder() && (props.item as Table).orders.length > 0 && (
        <View>
          <Text style={styles.vacant}>VACANT</Text>
        </View>
      )}
      <View style={styles.row}>
        <TouchableOpacity onPress={statusHandler}>
          <Button textColor="grey">{isOrder() ? 'Cancel' : 'Paid'}</Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListItem;
