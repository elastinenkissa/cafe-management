import { StyleSheet, Text, View } from 'react-native';

import AddNewButton from '../UI/AddNewButton';

import { EntryType } from './PageView';

interface NewEntryFooterProps extends EntryType {
  onPress: () => void;
}
 
const NewEntryFooter: React.FC<NewEntryFooterProps> = (props) => {
  const styles = StyleSheet.create({
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    total: {
      fontSize: 18,
      opacity: props.outside ? 0 : 1,
      color: 'white'
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
