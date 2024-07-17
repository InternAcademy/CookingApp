import React, { useState, useContext } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { TranslationContext } from "../context/TranslationContext";

const TranslationComponent = () => {
  const { translateText, translatedText, targetLanguage, setTargetLanguage } = useContext(TranslationContext);
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Enter text to translate" value={text} onChangeText={setText} />
      <Button title="Translate" onPress={() => translateText(text)} />
      <Text style={styles.result}>{translatedText}</Text>
      <TextInput style={styles.input} placeholder="Set target language (e.g., en, es, fr)" value={targetLanguage} onChangeText={setTargetLanguage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center"
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8
  },
  result: {
    marginTop: 20,
    fontSize: 20
  }
});

export default TranslationComponent;
