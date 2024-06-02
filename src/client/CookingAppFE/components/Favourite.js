import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const Favourite = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/back.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="heart" size={30} color="#F09A35" />
        </TouchableOpacity>
        <Text style={styles.iconText}>Favorites Recipes</Text>
      </View>
      <Text style={styles.recipeItem}>Lava Cake</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 24,
    paddingLeft: 38,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  iconText: {
    fontSize: 16,
    color: "#F09A35",
    paddingLeft: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F09A35",
    marginBottom: 20,
  },
  recipeItem: {
    fontSize: 18,
    color: "#000000",
    marginBottom: 10,
  },
});

export default Favourite;
