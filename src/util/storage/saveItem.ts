import AsyncStorage from '@react-native-async-storage/async-storage';

import { Deptor } from '../types/deptor';
import { Table } from '../types/table';

export const saveItem = async (
  name: string,
  array: Array<Table> | Array<Deptor>
) => {
  await AsyncStorage.setItem(name, JSON.stringify(array));
};
