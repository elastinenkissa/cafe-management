import React from 'react';
import { FlatList } from 'react-native';

import ManagementNew from '../../components/settings/ManagementNew';
import ListItem from '../../components/shared/General/ListItem';
import NewMenuItem from '../../components/settings/NewMenuItem';

import { ModalRef } from '../../components/shared/UI/Modal';
import { MenuItem } from '../../util/types/menu';

import cafeService from '../../util/services/cafeService';

import { UserContext, UserContextType } from '../../util/context/UserContext';

import { errorLogger } from '../../util/logger/errorLogger';

const MenuManagement: React.FC = () => {
  const [menu, setMenu] = React.useState<Array<MenuItem>>();

  const modalRef = React.useRef<ModalRef>();

  const { user } = React.useContext<UserContextType>(UserContext);

  const fetchMenu = async () => {
    try {
      const fetchedMenu = await cafeService.getMenu(user?.cafe.id!);
      setMenu(fetchedMenu);
    } catch (error: any) {
      errorLogger(error);
    }
  };

  React.useEffect(() => {
    fetchMenu();
  }, []);

  const newItemHandler = (item: MenuItem) => {
    setMenu((prevMenu) => prevMenu?.concat(item));
  };

  const removeMenuItemHandler = () => {};

  return (
    <ManagementNew
      ref={modalRef}
      modalContent={
        <NewMenuItem
          user={user!}
          forwardNewItem={newItemHandler}
          closeModal={() => modalRef.current?.setInvisible()}
        />
      }
    >
      <FlatList
        data={menu}
        renderItem={({ item }) => (
          <ListItem
            onRemove={removeMenuItemHandler}
            item={item}
            key={item.id}
          />
        )}
      />
    </ManagementNew>
  );
};

export default MenuManagement;
