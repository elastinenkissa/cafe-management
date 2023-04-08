import React from 'react';
import ManageButton from '../shared/UI/ManageButton';

interface RemoveTableButton {
  onRemove: () => void;
}

const RemoveTableButton: React.FC<RemoveTableButton> = (props) => {
  return <ManageButton onPress={props.onRemove}>-</ManageButton>;
};

export default RemoveTableButton;
