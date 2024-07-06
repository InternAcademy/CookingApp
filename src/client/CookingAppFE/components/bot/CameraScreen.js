import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, Text, TouchableOpacity, View, Image } from 'react-native';
import tw from 'twrnc';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../redux/uiSlice';
import { useNavigation } from '@react-navigation/native';

export default function CameraScreen() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo.uri);
    }
  }

  function handleRetry() {
    setPhoto(null);
  }

  function handleOk() {
    dispatch(uiActions.setPhotoUri(photo));
    navigation.navigate('Home'); // Пренасочване към Home
  }

  return (
    <View style={tw`flex-1 justify-center`}>
      {photo ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <Image source={{ uri: photo }} style={tw`w-full h-4/5`} />
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
          <View style={[tw`absolute bottom-0 w-full flex-row justify-around items-center`, { backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 16 }]}>
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
