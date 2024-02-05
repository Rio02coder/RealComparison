/* istanbul ignore file */
import AsyncStorage from '@react-native-community/async-storage';

export enum MemoryIDs {
  SESSION = '@session',
  SEARCH = '@search',
}

export const setItem = async <T = any>(
  key: string,
  value: T,
  callback?: (error?: Error) => void,
): Promise<void> => AsyncStorage.setItem(key, JSON.stringify(value), callback);

export const getItem = async <T>(
  key: string,
  callback?: (error?: Error, result?: string) => void,
): Promise<T | undefined> => {
  const savedData = await AsyncStorage.getItem(key, callback);
  if (savedData == null) {
    return undefined;
  }
  const parsedSavedData = (await JSON.parse(savedData)) as T;
  return parsedSavedData;
};
