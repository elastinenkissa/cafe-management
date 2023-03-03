import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async (name: string) => {
  const storedArray = await AsyncStorage.getItem(name);
  return JSON.parse(storedArray!);
};
 