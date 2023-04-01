import React from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useLocation } from 'react-router-native';
import { Button, Text } from 'react-native-paper';

import { Order } from '../../../util/types/order';
import { Deptor } from '../../../util/types/deptor';
import { Table } from '../../../util/types/table';
import { Employee } from '../../../util/types/employee';
import {
  UserContext,
  UserContextType
} from '../../../util/context/UserContext';

interface ListItemProps {
  onRemove: () => void;
  item: Order | Deptor | Table | Employee;
  pressed?: boolean;
  paid?: boolean;
  style?: any;
}

const ListItem: React.FC<ListItemProps> = (props) => {
  const [paid, setPaid] = React.useState<boolean>(false);

  const { pathname } = useLocation();

  const { user } = React.useContext<UserContextType>(UserContext);

  const isOrder = (): boolean => {
    return (
      (props.item as Order).price !== undefined &&
      (props.item as Employee).username === undefined
    );
  };

  const isEmployee = (): boolean => {
    return (props.item as Employee).username !== undefined;
  };

  const isTableOrDeptor = (): boolean => {
    return !isOrder() && !isEmployee();
  };

  const buttonText = () => {
    if (isOrder()) {
      return 'Cancel';
    }

    if (pathname.startsWith('/options')) {
      {
        return 'Remove';
      }
    }

    return 'Paid';
  };

  const statusFunction = () => {
    if (isEmployee()) {
      return props.onRemove();
    }

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

    if (isEmployee()) {
      Alert.alert(
        'Are you sure?',
        `This will remove access from ${props.item.name} to ${user?.cafe.name}`,
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel'
          },
          {
            text: 'Yes',
            onPress: statusFunction
          }
        ]
      );
      return;
    }

    Alert.alert(
      'Are you sure?',
      pathname.startsWith('/options')
        ? `This will remove ${props.item.name} from ${user?.cafe.name}`
        : `This will clear all orders from ${props.item.name}`,
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Yes',
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
    <View style={[styles.item, props.style]}>
      <View style={styles.row}>
        <Text style={styles.text}>{props.item.name}</Text>
        {paid && (pathname === '/cafe' || pathname === '/outside') && (
          <Text style={styles.paid}>PAID</Text>
        )}
      </View>

      {isTableOrDeptor() &&
        (props.item as Table).orders.length > 0 &&
        pathname !== '/outside' && (
          <View>
            <Text style={styles.vacant}>VACANT</Text>
          </View>
        )}
      <View style={styles.row}>
        <TouchableOpacity onPress={statusHandler}>
          <Button textColor="grey">{buttonText()}</Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListItem;
