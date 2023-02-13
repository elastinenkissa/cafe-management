import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Order } from '../../../util/types/order';
import { Deptor } from '../../../util/types/deptor';
import { Table } from '../../../util/types/table';

interface ListItemProps {
  onRemove: () => void;
  onChangeToPaid?: () => void;
  item: Order | Deptor | Table;
  pressed?: boolean;
}

const ListItem: React.FC<ListItemProps> = (props) => {
  const isDeptor = (item: Deptor | Order | Table): item is Deptor => {
    return (item as Deptor).paid !== undefined;
  };

  const isTable = () => {
    return props.item.name.startsWith('Table');
  };

  const removeHandler = () => {
    if (!isDeptor(props.item)) {
      return props.onRemove();
    }
    Alert.alert(
      `Remove ${props.item.name}?`,
      'This will irreversibly clear out the content',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => props.onRemove()
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
    }
  });

  return (
    <View style={styles.item}>
      <View style={styles.row}>
        <Text style={styles.text}>{props.item.name}</Text>
        {isDeptor(props.item) && (props.item as Deptor).paid && (
          <Text style={styles.paid}>PAID</Text>
        )}
      </View>
      <View style={styles.row}>
        {(isDeptor(props.item) || isTable()) && (
          <TouchableOpacity onPress={props.onChangeToPaid}>
            <Button textColor="grey">Paid</Button>
          </TouchableOpacity>
        )}
        {!isTable() && (
          <TouchableOpacity onPress={removeHandler}>
            <Button textColor="grey">Remove</Button>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ListItem;
