import { useState } from "react";
import { Button, Image, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { chatActions } from "../../redux/chatSlice";
import { useNavigation } from "@react-navigation/native";
import { userActions } from "../../redux/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import useChatMutation from "../../hooks/useChatMutation";
import { uiActions } from "../../redux/uiSlice";
export default function ImageScreen() {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.user.selectedChat);
  const responseError = useSelector((state) => state.ui.responseError);
  const navigation = useNavigation();
  const { mutate, isPending, isError, error } = useChatMutation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });
    const uri = result.assets[0].uri;
    const token = await AsyncStorage.getItem("token");
    dispatch(
      userActions.selectChat({
        ...selectedChat,
        content: [
          ...(selectedChat?.content || []),
          { role: "user", type: "Image", content: uri },
        ],
      })
    );
    dispatch(uiActions.setResponseError(null));
    mutate({
      token: token,
      chatId: selectedChat && selectedChat.id,
      type: "Image",
      content: uri,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      dispatch(chatActions.setUri(uri));
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
