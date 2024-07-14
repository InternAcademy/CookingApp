import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView, Modal, Animated } from "react-native";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import useSelectChat from "../../hooks/useSelectChat";
import { userActions } from "../../redux/userSlice";
import useChatHistory from "../../hooks/useChatHistory";
const Sidebar = ({ open, setOpen }) => {
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);
  const chat = useSelector(state => state.user.selectedChat);
  const chatHistory = useSelector(state => state.user.chatHistory);
  const selectChat = useSelectChat();
  const { refetchChatHistory } = useChatHistory();
  const dispatch = useDispatch();
  const [animation] = useState(new Animated.Value(-300));
  useEffect(() => {
    refetchChatHistory();
  }, [chat]);
  useEffect(() => {
    if (open) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true
      }).start();
    }
  }, [open, animation]);

  const handleChatPress = async chat => {
    selectChat(chat);
    setOpen(false);
  };
  const startNewChat = () => {
    dispatch(userActions.clearChat());
    setOpen(false);
  };
  const getSectionTitle = date => {
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
      const sectionTitle = getSectionTitle(chat.time);
      if (!acc[sectionTitle]) {
        acc[sectionTitle] = [];
      }
      acc[sectionTitle].push(chat);
      return acc;
    }, {});

  const orderedSections = ["Today", "Yesterday", "Previous 7 days", "Previous 30 days", "Older than 30 days"];

  return (
    <Modal transparent visible={open}>
      <Pressable style={styles.overlay} onPress={() => setOpen(false)} />
      <Animated.View style={[styles.sidebar, tw`${isDarkTheme ? "bg-[#202020]" : "bg-white"}`, { transform: [{ translateX: animation }] }]}>
        <View style={styles.header}>
          <View style={tw`flex-row items-center`}>
            <Pressable onPress={() => setOpen(false)}>
              <Ionicons name="menu" size={24} color={isDarkTheme ? "white" : "black"} />
            </Pressable>
            <Pressable onPress={startNewChat} style={tw`ml-2`}>
              <Ionicons name="chatbox-ellipses-sharp" size={24} color={isDarkTheme ? "white" : "black"} />
            </Pressable>
          </View>
        </View>

        <ScrollView style={styles.scrollView}>
          {chatHistory &&
            orderedSections.map(
              sectionTitle =>
                sortedChatHistory[sectionTitle] && (
                  <View key={sectionTitle} style={styles.section}>
                    <Text style={[styles.title, tw`${isDarkTheme ? "text-white" : "text-gray-700"}`]}>{sectionTitle}</Text>
                    {sortedChatHistory[sectionTitle].map((chat, idx) => (
                      <Pressable key={idx} onPress={() => handleChatPress(chat)}>
                        <Text style={[styles.bullet, tw`${isDarkTheme ? "text-white" : "text-gray-700"}`]}>{chat.title}</Text>
                      </Pressable>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  sidebar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 300,
    padding: 16,
    zIndex: 1
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8
  },
  toggleIcon: {
    fontSize: 30
  },
  section: {
    flexDirection: "column",
    paddingLeft: 4,
    paddingRight: 4,
    marginBottom: 16
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8
  },
  bullet: {
    marginLeft: 16,
    marginBottom: 4,
    fontSize: 14
  },
  scrollView: {
    paddingRight: 16
  }
});

export default Sidebar;
