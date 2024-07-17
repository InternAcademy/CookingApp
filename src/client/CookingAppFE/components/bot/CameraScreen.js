import tw from "twrnc";
import { useState, useRef } from "react";
import { Button, Text, TouchableOpacity, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../redux/uiSlice";
import { userActions } from "../../redux/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useChatMutation from "../../hooks/useChatMutation";

export default function CameraScreen() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const selectedChat = useSelector(state => state.user.selectedChat);
  const { mutate } = useChatMutation();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-center`}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === "back" ? "front" : "back"));
  }

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.1
      });
      console.log(photo);
      setPhoto(photo);
    }
  }

  function handleRetry() {
    setPhoto(null);
  }

  async function handleOk() {
    if (photo) {
      const token = await AsyncStorage.getItem("token");
      const uri = photo.uri;

      dispatch(
        userActions.selectChat({
          ...selectedChat,
          content: [...(selectedChat?.content || []), { role: "user", type: "Image", content: uri }]
        })
      );
      dispatch(uiActions.setResponseError(null));
      mutate({
        token: token,
        chatId: selectedChat && selectedChat.id,
        type: "Image",
        content: `data:image/jpeg;base64,${photo.base64}`
      });

      navigation.navigate("Home");
    }
  }

  return (
    <View style={tw`flex-1 justify-center`}>
      {photo ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <Image source={{ uri: photo.uri }} style={tw`w-full h-4/5`} />
          <View style={[tw`flex-row items-end bg-transparent mt-16`, { gap: 150 }]}>
            <TouchableOpacity style={tw`bg-gray-800 p-3 rounded`} onPress={handleRetry}>
              <Text style={tw`text-lg text-white`}>Retry</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`bg-gray-800 p-3 rounded`} onPress={handleOk}>
              <Text style={tw`text-lg text-white`}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <CameraView style={tw`flex-1`} facing={facing} ref={cameraRef}>
          <View style={[tw`absolute bottom-0 w-full flex-row justify-around items-center`, { backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 16 }]}>
            <TouchableOpacity style={tw`bg-gray-800 p-3 rounded`} onPress={toggleCameraFacing}>
              <Text style={tw`text-lg text-white`}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`bg-gray-800 p-3 rounded`} onPress={takePicture}>
              <Text style={tw`text-lg text-white`}>Take Picture</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
}
