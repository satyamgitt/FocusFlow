import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveRestrictedApps = async (restricted: string[]) => {
  await AsyncStorage.setItem('restrictedApps', JSON.stringify(restricted));
};

export const loadRestrictedApps = async (): Promise<string[]> => {
  const data = await AsyncStorage.getItem('restrictedApps');
  return data ? JSON.parse(data) : [];
};

export const saveTriggers = async (triggers: Record<string, any>) => {
  await AsyncStorage.setItem('triggers', JSON.stringify(triggers));
};

export const loadTriggers = async (): Promise<Record<string, any>> => {
  const data = await AsyncStorage.getItem('triggers');
  return data ? JSON.parse(data) : {};
};