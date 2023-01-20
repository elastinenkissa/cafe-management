import { StyleSheet, Text, View } from 'react-native';
import { useLocation } from 'react-router-native';

import AddNewButton from '../UI/AddNewButton';

import { Order } from '../../../util/types/order';

interface NewEntryFooterProps {
  entries?: Array<Order>;
  onPress: () => void;
}

const NewEntryFooter: React.FC<NewEntryFooterProps> = (props) => {
  const { pathname } = useLocation();

  const styles = StyleSheet.create({
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    total: {
      fontSize: 18,
      opacity: pathname === '/outside' ? 0 : 1
    }
  });

  return (
    <View style={styles.footer}>
      <Text style={styles.total}>
        Total:{' '}
        {props.entries?.reduce(
          (accumulator, current) => accumulator + current.price,
          0
        )}{' '}
        KM
      </Text>
      <AddNewButton onPress={props.onPress} />
    </View>
  );
};

export default NewEntryFooter;
