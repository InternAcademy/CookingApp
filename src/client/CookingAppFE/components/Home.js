import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";

const Home = () => {
  const renderPost = () => (
    <View style={styles.postContainer}>
      <View style={styles.userContainer}>
        <Image
          source={require("../assets/user.png")}
          style={styles.userImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.userName}>Jane Doe</Text>
          <Text style={styles.postText}>
            Generate me a picture of this recipe
          </Text>
        </View>
      </View>

      <View style={styles.userContainer}>
        <Image
          source={require("../assets/icon.png")}
          style={styles.userImage}
        />
        <View style={styles.textContainer}>
          <Text style={[styles.userName, styles.masterBotText]}>MasterBot</Text>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/lava_cake1.jpg")}
          style={styles.postImage}
        />
        <Image
          source={require("../assets/lava_cake2.jpg")}
          style={[styles.postImage, styles.postImagePadding]}
        />
      </View>
      <Text style={[styles.caption, styles.captionPadding]}>
        Here are some example pictures of Lava Cakes.
      </Text>
      <TouchableOpacity style={styles.printContainer}>
        <Image
          source={require("../assets/heart.png")}
          style={styles.printIcon}
        />
        <Image
          source={require("../assets/printer.png")}
          style={styles.printIcon}
        />
        <Text style={styles.printText}>Print as a Recipe Card</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[{ key: "1" }]}
        renderItem={renderPost}
        keyExtractor={(item) => item.key}
      />
      <View style={styles.chatContainer}>
        <TouchableOpacity style={styles.chatButton}>
          <Image
            source={require("../assets/camera.png")}
            style={styles.chatIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatButton}>
          <Image
            source={require("../assets/upload.png")}
            style={styles.chatIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatButton}>
          <Image
            source={require("../assets/drive.png")}
            style={styles.chatIcon}
          />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Message MasterBot" />
          <TouchableOpacity style={styles.microphoneButton}>
            <Image
              source={require("../assets/microphone.png")}
              style={styles.chatIcon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.chatButton}>
          <Image
            source={require("../assets/headphone.png")}
            style={styles.chatIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 12,
  },
  postContainer: {
    padding: 24,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ddd",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    // paddingLeft: 50,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  userName: {
    paddingTop: 22,
    fontSize: 16,
    fontWeight: "bold",
  },
  masterBotText: {
    paddingTop: 0, // Премахва отместването нагоре за MasterBot
  },
  postText: {
    fontSize: 16,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 0, // Намалено разстояние между MasterBot и изображенията
    paddingLeft: 40, // Добавено отместване надясно
  },
  postImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  postImagePadding: {
    marginLeft: 10,
  },
  caption: {
    marginTop: 10,
    fontSize: 14,
    color: "#888",
  },
  captionPadding: {
    paddingLeft: 40, // Добавено отместване на текста
  },
  chatContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  chatButton: {
    padding: 5, // Намалено разстояние между иконките
  },
  chatIcon: {
    width: 24,
    height: 24,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    backgroundColor: "#FFF4E2",
  },
  input: {
    flex: 1,
    height: 40,
  },
  microphoneButton: {
    padding: 5,
  },
  printContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingLeft: 40,
  },
  printIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
    tintColor: "#FFA500",
  },
  printText: {
    color: "#FFA500",
    fontSize: 12,
  },
});

export default Home;
