import React from 'react';
import ManageButton from './ManageButton';

interface AddNewProps {
  onAdd: () => void;
}

const AddNewButton: React.FC<AddNewProps> = (props) => {
  return <ManageButton onPress={props.onAdd}>+</ManageButton>;
};

export default AddNewButton;
