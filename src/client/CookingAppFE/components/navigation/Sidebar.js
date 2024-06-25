import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Импортиране на useNavigation
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../../context/ThemeContext";
import { jwtDecode } from "jwt-decode";
import { chatHistoryData } from "../../components/navigation/chatHistoryData"; // Import mock data
import Ionicons from "react-native-vector-icons/Ionicons"; // Импортиране на иконите

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const window = useWindowDimensions();
  const { isDarkTheme } = useTheme();
  const navigation = useNavigation(); // Използване на useNavigation

  useEffect(() => {
    const handleResize = () => {
      window.width <= 720 ? setOpen(false) : setOpen(true);
    };

    handleResize();
  }, [window]);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          throw new Error("No OAuth2 token found");
        }
        const decodedToken = jwtDecode(token);

        console.log(decodedToken);

        const response = await fetch(
          `https://localhost:8001/user-chats/${decodedToken.sub}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (data) {
          setChatHistory(data);
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }

    fetchData();
  }, []);

  const handleChatPress = (chat) => {
    async function fetchData() {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          throw new Error("No OAuth2 token found");
        }

        const response = await fetch(
          `https://localhost:8001/c/${chat.chatId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        console.log(data);
        if (data) {
          navigation.navigate("Home", { selectedChat: data });
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }

    fetchData();
  };

  const getSectionTitle = (date) => {
    const today = new Date();
    const chatDate = new Date(date);

    // Нулиране на часовете, минутите и секундите за точно сравнение на датите
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

  const sortedChatHistory = chatHistory.reduce((acc, chat) => {
    const sectionTitle = getSectionTitle(chat.date);
    if (!acc[sectionTitle]) {
      acc[sectionTitle] = [];
    }
    acc[sectionTitle].push(chat);
    return acc;
  }, {});

  console.log("Sorted chat history:", sortedChatHistory);

  const orderedSections = [
    "Today",
    "Yesterday",
    "Previous 7 days",
    "Previous 30 days",
    "Older than 30 days",
  ];

  return (
    <View
      style={[
        styles.sidebar,
        { width: open ? 256 : 64 },
        tw`${isDarkTheme ? "bg-[#202020]" : "bg-white"}`,
      ]}
    >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          {open && (
            <TouchableOpacity onPress={() => setSelectedChat(null)}>
              <Ionicons
                name="arrow-back"
                size={24}
                color={isDarkTheme ? "white" : "gray"}
              />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => setOpen(!open)}>
          <Text
            style={[
              tw`${isDarkTheme ? "text-white" : "text-gray-700"}`,
              styles.toggleIcon,
            ]}
          >
            {open ? "×" : "≡"}
          </Text>
        </TouchableOpacity>
      </View>

      {open && (
        <ScrollView style={styles.scrollView}>
          {orderedSections.map(
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    flexDirection: "column",
    height: "100%",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 16,
    height: 16,
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
  chatDetails: {
    padding: 16,
  },
  details: {
    fontSize: 14,
    marginBottom: 16,
  },
});

export default Sidebar;
