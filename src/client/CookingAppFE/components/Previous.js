// components/Previous.js

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

const Previous = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/back.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => console.log("Previous pressed")}>
          <Image
            source={require("../assets/previous.png")}
            style={styles.favoriteIcon}
          />
        </TouchableOpacity>
        <Text style={styles.iconText}>Previous Chats</Text>
      </View>
      <TouchableOpacity style={styles.itemContainer}>
        <Text style={styles.itemTitle}>Strawberry ShortCake</Text>
        <Text style={styles.itemDescription}>
          To make a delicious lava cake, follow these steps:
        </Text>
        <View style={styles.stepsContainer}>
          <Text style={styles.stepNumber}>1.</Text>
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepText}>Prepare Ingredients:</Text>
            <Text style={styles.ingredient}>
              • 4 ounces of semi-sweet chocolate
            </Text>
            <Text style={styles.ingredient}>• 1/2 cup of unsalted butter</Text>
            <Text style={styles.ingredient}>• 1 cup of powdered sugar</Text>
            <Text style={styles.ingredient}>• 2 large eggs</Text>
            <Text style={styles.ingredient}>• 2 large egg yolks</Text>
            <Text style={styles.ingredient}>
              • 1 teaspoon of vanilla extract
            </Text>
            <Text style={styles.ingredient}>
              • 1/4 cup of all-purpose flour
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text style={styles.showMore}>Show more</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.moreResults}>More results</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    paddingLeft: 34,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  favoriteIcon: {
    width: 30,
    height: 30,
  },
  iconText: {
    fontSize: 18,
    color: "#F09A35",
    marginLeft: 10,
  },
  recipeItem: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  itemContainer: {
    backgroundColor: "#F8F8F8",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  stepsContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  stepTextContainer: {
    flex: 1,
  },
  stepText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ingredient: {
    fontSize: 16,
    marginLeft: 8,
  },
  showMore: {
    fontSize: 16,
    color: "#FFA500",
    marginTop: 8,
  },
  moreResults: {
    fontSize: 16,
    color: "#FFA500",
    textAlign: "left",
    marginTop: 0,
    paddingLeft: 16,
  },
});

export default Previous;
