import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useLocation } from 'react-router-native';

import { Order } from '../../../util/types/order';
import { Deptor } from '../../../util/types/deptor';

interface ListItemProps {
  onRemove: () => void;
  onChangeToPaid: () => void;
  item: Order | Deptor;
}

const ListItem: React.FC<ListItemProps> = (props) => {
  const { pathname } = useLocation();

  return (
    <View style={styles.item}>
      <Text style={styles.text}>{props.item.name}</Text>
      <View style={styles.buttons}>
        {pathname === '/outside' && (
          <TouchableOpacity onPress={props.onChangeToPaid}>
            <Button>Paid</Button>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={props.onRemove}>
          <Button>Remove</Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontSize: 18
  },
  buttons: {
    flexDirection: 'row'
  }
});

export default ListItem;
