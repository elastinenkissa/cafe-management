import { Pressable, StyleSheet } from 'react-native';
import { NavigateFunction, useNavigate } from 'react-router-native';

interface TableProps {
  id: number;
}

const Table: React.FC<TableProps> = (props) => {
  const redirect: NavigateFunction = useNavigate();

  const redirectHandler = (): void => {
    redirect(`/tables/${props.id}`);
  };

  return <Pressable onPress={redirectHandler} style={styles.table} />;
};

const styles = StyleSheet.create({
  table: {
    borderWidth: 2,
    borderColor: 'black',
    height: 50,
    width: 50,
    borderRadius: 25
  }
});

export default Table;
