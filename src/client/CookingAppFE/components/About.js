import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const About = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>About</Text>
      <Text style={styles.text}>
        This is a sample text. Welcome to [Your Restaurant Name], where culinary
        passion meets exceptional service. Established in [Year], we are
        dedicated to bringing you a dining experience like no other. Our menu
        features a delightful blend of traditional and contemporary dishes,
        crafted from the freshest ingredients sourced locally and globally.
      </Text>
      <Text style={styles.text}>
        At [Your Restaurant Name], we believe that food is more than just
        sustenance; it's a way to connect, celebrate, and create memories.
        Whether you're here for a casual meal, a special occasion, or just a cup
        of our signature coffee, we strive to make every visit unforgettable.
      </Text>
      <Text style={styles.text}>
        Our team of talented chefs and friendly staff are committed to providing
        you with top-notch service and a warm, inviting atmosphere. We are
        passionate about what we do, and it shows in every plate we serve.
      </Text>
      <Text style={styles.text}>
        Thank you for choosing [Your Restaurant Name]. We look forward to
        welcoming you and sharing our love for food with you.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FFB351",
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
});

export default About;
