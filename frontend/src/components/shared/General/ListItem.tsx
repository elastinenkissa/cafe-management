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
import { errorLogger } from '../../../util/logger/errorLogger';

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

  const isMenuItem = (): boolean => {
    return (
      (props.item as Order).price !== undefined &&
      pathname.startsWith('/options')
    );
  };

  const isEmployee = (): boolean => {
    return (props.item as Employee).username !== undefined;
  };

  const isTableOrDeptor = (): boolean => {
    return !isOrder() && !isEmployee();
  };

  const buttonText = () => {
    if (isMenuItem() || isEmployee()) {
      return 'Remove';
    }

    if (isOrder()) {
      return 'Cancel';
    }

    return 'Paid';
  };

  const statusFunction = async () => {
    if (isEmployee()) {
      return props.onRemove();
    }

    try {
      await props.onRemove();
      setPaid(true);
      setTimeout(() => {
        setPaid(false);
      }, 3000);
    } catch (error: any) {
      errorLogger(error);
    }
  };

  const statusHandler = () => {
    if (isOrder() && pathname.startsWith('/options')) {
      Alert.alert(
        'Are you sure?',
        `This will remove ${props.item.name} from ${user?.cafe.name}`,
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
      `This will clear all orders from ${props.item.name}`,
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
    },
    price: { color: 'white' }
  });

  return (
    <View style={[styles.item, props.style]}>
      <View style={styles.row}>
        <Text style={styles.text}>{props.item.name}</Text>
        {(paid || isMenuItem()) && (
          <Text style={styles.paid}>
            {isTableOrDeptor()
              ? 'PAID'
              : `${(props.item as Order).price.toFixed(2)} ${
                  user?.cafe.currency
                }`}
          </Text>
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
