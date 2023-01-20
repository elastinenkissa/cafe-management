import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Order } from '../../../util/types/order';
import { Deptor } from '../../../util/types/deptor';

interface ListItemProps {
  onRemove: () => void;
  item: Order | Deptor
}

const ListItem: React.FC<ListItemProps> = (props) => {
  return (
    <View style={styles.item}>
      <Text style={styles.text}>{props.item.name}</Text>
      <TouchableOpacity onPress={props.onRemove}>
        <Button>Remove</Button>
      </TouchableOpacity>
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
  }
});

export default ListItem;
