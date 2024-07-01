import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getChat, getUserChats } from "../../http/chat";
import { userActions } from "../../redux/userSlice";
const Sidebar = ({ open, setOpen }) => {
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);
  const chat = useSelector((state) => state.user.selectedChat);
  const dispatch = useDispatch();
  const {
    data: chatHistory,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["getHistory"],
    queryFn: async () => {
      const token = await AsyncStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      return (
        decodedToken && getUserChats({ token: token, userId: decodedToken.sub })
      );
    },
  });
  const { mutate } = useMutation({
    mutationFn: getChat,
    onSuccess: (response) => {
      const { requests, responses } = response.data.chat;
      const minLength = Math.min(requests.length, responses.length);
      let combinedArray = [];
      for (let i = 0; i < minLength; i++) {
        combinedArray.push({ content: requests[i], role: "user" });
        combinedArray.push({ content: responses[i], role: "bot" });
      }

      for (let i = minLength; i < requests.length; i++) {
        combinedArray.push({ content: requests[i], role: "user" });
      }

      for (let i = minLength; i < responses.length; i++) {
        combinedArray.push({ content: responses[i], role: "bot" });
      }
      dispatch(
        userActions.selectChat({
          id: response.data.id,
          title: response.data.title,
          content: combinedArray,
        })
      );
      setOpen(false);
    },
  });
  const navigation = useNavigation();
  const [animation] = useState(new Animated.Value(-300));
  useEffect(() => {
    refetch();
  }, [chat]);
  useEffect(() => {
    if (open) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [open, animation]);

  const handleChatPress = async (chat) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      mutate({ token, chatId: chat.id });
    } else {
      navigation.navigate("LandingPage");
    }
  };

  const startNewChat = () => {
    navigation.navigate("Home");
    setOpen(false);
  };

  const getSectionTitle = (date) => {
    const today = new Date();
    const chatDate = new Date(date);

    today.setHours(0, 0, 0, 0);
    chatDate.setHours(0, 0, 0, 0);

    const diffTime = today - chatDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays <= 7) return "Previous 7 days";
    if (diffDays <= 30) return "Previous 30 days";
    return "Older than 30 days";
  };

  const sortedChatHistory =
    chatHistory &&
    chatHistory.reduce((acc, chat) => {
      const sectionTitle = getSectionTitle(chat.date);
      if (!acc[sectionTitle]) {
        acc[sectionTitle] = [];
      }
      acc[sectionTitle].push(chat);
      return acc;
    }, {});

  const orderedSections = [
    "Today",
    "Yesterday",
    "Previous 7 days",
    "Previous 30 days",
    "Older than 30 days",
  ];

  return (
    <Modal transparent visible={open}>
      <TouchableOpacity style={styles.overlay} onPress={() => setOpen(false)} />
      <Animated.View
        style={[
          styles.sidebar,
          tw`${isDarkTheme ? "bg-[#202020]" : "bg-white"}`,
          { transform: [{ translateX: animation }] },
        ]}
      >
        <View style={styles.header}>
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <Ionicons
                name="menu"
                size={24}
                color={isDarkTheme ? "white" : "black"}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={startNewChat} style={tw`ml-2`}>
              <Ionicons
                name="chatbox-ellipses-sharp"
                size={24}
                color={isDarkTheme ? "white" : "black"}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.scrollView}>
          {chatHistory &&
            orderedSections.map(
              (sectionTitle) =>
                sortedChatHistory[sectionTitle] && (
                  <View key={sectionTitle} style={styles.section}>
                    <Text
                      style={[
                        styles.title,
                        tw`${isDarkTheme ? "text-white" : "text-gray-700"}`,
                      ]}
                    >
                      {sectionTitle}
                    </Text>
                    {sortedChatHistory[sectionTitle].map((chat, idx) => (
                      <TouchableOpacity
                        key={idx}
                        onPress={() => handleChatPress(chat)}
                      >
                        <Text
                          style={[
                            styles.bullet,
                            tw`${isDarkTheme ? "text-white" : "text-gray-700"}`,
                          ]}
                        >
                          {chat.title}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )
            )}
        </ScrollView>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sidebar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 300,
    padding: 16,
    zIndex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  toggleIcon: {
    fontSize: 30,
  },
  section: {
    flexDirection: "column",
    paddingLeft: 4,
    paddingRight: 4,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bullet: {
    marginLeft: 16,
    marginBottom: 4,
    fontSize: 14,
  },
  scrollView: {
    paddingRight: 16,
  },
});

export default Sidebar;
