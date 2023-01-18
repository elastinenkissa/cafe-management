import React from 'react';
import { Button, Modal } from 'react-native';
import { RadioButton } from 'react-native-paper';

interface NewOrdeProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const NewOrder: React.FC<NewOrdeProps> = (props) => {
  const [orderItem, setOrderItem] = React.useState<string>('');

  const orderItemSelectHandler = (): void => {
    if (orderItem === '') {
      return;
    }
    setOrderItem('');
    props.setVisible(false);
  };

  return (
    <Modal
      visible={props.visible}
      onRequestClose={() => props.setVisible(false)}
    >
      <RadioButton.Group
        value={orderItem}
        onValueChange={(value) => setOrderItem(value)}
      >
        <RadioButton.Item label="Espresso" value="Espresso" />
        <RadioButton.Item label="Bosnian" value="Bosnian" />
        <RadioButton.Item label="Tea" value="Tea" />
        <Button
          color="#ffc0cb"
          title="Add order"
          onPress={orderItemSelectHandler}
        />
      </RadioButton.Group>
    </Modal>
  );
};

export default NewOrder;
