import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItemStorage = async (key: string, data: string | object) => {
  try {
    const value = JSON.stringify(data);
    await AsyncStorage.setItem(key, value);
    return value;
  } catch (error) {
    return null;
  }
};

export const getItemStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  } catch (error) {
    return null;
  }
};

export const removeItemStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    return null;
  }
};

export const getAllKeyStorage = async () => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    return null;
  }
};

export const clearAllStorage = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    return null;
  }
};
