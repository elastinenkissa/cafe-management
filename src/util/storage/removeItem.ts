import AsyncStorage from '@react-native-async-storage/async-storage';

export const removeItem = async (name: string) => {
  await AsyncStorage.removeItem(name);
};
 