import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

const LandingPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/icon.png")} style={styles.logo} />
      </View>
      <Text style={styles.title}>Let's Get Started</Text>
      <Text style={styles.subtitle}>
        Easy way to manage all your cooking tasks as easy as tapping your finger
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f39c12",
  },
});

export default LandingPage;
