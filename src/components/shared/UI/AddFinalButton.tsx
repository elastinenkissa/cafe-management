import { Button } from 'react-native';

interface AddFinalButton {
  onAdd: () => void;
}

const AddFinalButton: React.FC<AddFinalButton> = (props) => {
  return <Button color="#ffc0cb" title="Add" onPress={props.onAdd} />;
};

// #ffc0cb

export default AddFinalButton;
