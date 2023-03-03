import { StyleSheet, View } from 'react-native';

import AddFinalButton from '../UI/AddFinalButton';
 
interface NewItemProps {
  children: React.ReactNode;
  onAddItem: () => void;
}

const NewItem: React.FC<NewItemProps> = (props) => {
  return (
    <View style={styles.buttons}>
      {props.children}
      <AddFinalButton onAdd={props.onAddItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    margin: 40,
    marginTop: '40%',
    backgroundColor: 'white'
  }
});

export default NewItem;
