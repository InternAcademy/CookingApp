import AsyncStorage from "@react-native-async-storage/async-storage";

export async function existsInCookie() {
  const token = await AsyncStorage.getItem("token");
  return token;
}
