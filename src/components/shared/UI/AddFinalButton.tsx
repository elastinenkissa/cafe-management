import { Button } from 'react-native';

interface AddFinalButton {
  onAdd: () => void;
}

const AddFinalButton: React.FC<AddFinalButton> = (props) => {
  return <Button color="#27292c" title="Add" onPress={props.onAdd} />;
};


export default AddFinalButton;
