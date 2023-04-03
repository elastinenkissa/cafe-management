import React from 'react';

import Input from '../shared/UI/Input';
import NewItem from '../shared/General/NewItem';

import cafeService from '../../util/services/cafeService';

import { PopulatedEmployee } from '../../util/types/employee';
import { MenuItem } from '../../util/types/menu';

interface NewMenuItemProps {
  closeModal: () => void;
  forwardNewItem: (item: MenuItem) => void;
  user: PopulatedEmployee;
}

const NewMenuItem: React.FC<NewMenuItemProps> = (props) => {
  const [name, setName] = React.useState<string>('');
  const [price, setPrice] = React.useState<string>('');
  const [nameError, setNameError] = React.useState<boolean>(false);
  const [priceError, setPriceError] = React.useState<boolean>(false);

  const numberChange = (value: string) => {
    if (value.split('.').length <= 2 && value[value.length - 1] !== '-') {
      setPrice(value);
    }
  };

  const numberInputHandler = (value: string) => {
    numberChange(value);
    if (value.length === 0) {
      return setPriceError(true);
    }
    setPriceError(false);
  };

  const nameInputHandler = (value: string) => {
    setName(value);
    if (value.length === 0) {
      return setNameError(true);
    }
    setNameError(false);
  };

  const createItem = async () => {
    const itemData = { name: name, price: parseFloat(price) };
    const item = await cafeService.createMenuItem(
      itemData,
      props.user.cafe.id,
      props.user
    );
    props.forwardNewItem(item);
  };

  const newMenuItemHandler = async () => {
    if (name.length === 0 && price.length === 0) {
      setPriceError(true);
      setNameError(true);
      return;
    }

    if (name.length === 0) {
      return setNameError(true);
    }

    if (price.length === 0) {
      return setPriceError(true);
    }
    await createItem();
    setPriceError(false);
    setNameError(false);
    props.closeModal();
  };

  return (
    <NewItem onAddItem={newMenuItemHandler}>
      <Input
        placeholder="Item name"
        onChange={nameInputHandler}
        value={name}
        error={nameError}
      />
      <Input
        placeholder="Item price"
        onChange={numberInputHandler}
        value={price}
        number
        error={priceError}
      />
    </NewItem>
  );
};

export default NewMenuItem;
