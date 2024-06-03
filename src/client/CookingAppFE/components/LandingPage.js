import Constants from 'expo-constants';
import useAuth from '../hooks/useAuth';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, SafeAreaView } from "react-native";

const tenantId = process.env.EXPO_PUBLIC_TENANT_ID;
const clientId = process.env.EXPO_PUBLIC_CLIENT_ID;

WebBrowser.maybeCompleteAuthSession();

const LandingPage = () => {
  console.log(clientId, tenantId)

  const { login, token, request } = useAuth(clientId, tenantId);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/icon.png")} style={styles.logo} />
      </View>
      <Text style={styles.title}>Let's Get Started</Text>
      <Text style={styles.subtitle}>
        Easy way to manage all your cooking tasks as easy as tapping your finger
      </Text>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => login()}
      />
      <Text>{token}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f39c12",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  imageContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
});

export default LandingPage;