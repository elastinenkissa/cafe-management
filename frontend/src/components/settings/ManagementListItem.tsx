import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Employee } from '../../util/types/employee';

interface ManagementListItemProps {
  item: Employee;
}

const ManagementListItem: React.FC<ManagementListItemProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>{props.item.name}</Text>
      <TouchableOpacity>
        <Button textColor={'grey'}>Remove</Button>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
})

export default ManagementListItem;
