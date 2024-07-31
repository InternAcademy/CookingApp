import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text } from "react-native";
import tw from "twrnc";
import * as Animatable from "react-native-animatable";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
const HeaderButton = () => {
  const [buttonText, setButtonText] = useState("Вземи PLUS");
  const chatsLeft = useSelector(
    (state) => state.user.role.limitations.chatGeneration
  );
  const role = useSelector((state) => state.user.role.type);
  const navigation = useNavigation();
  useEffect(() => {
    console.log("req left: ", chatsLeft);
    if (role === "Free") {
      const interval = setInterval(() => {
        setButtonText((prev) =>
          prev === "Get Premium" ? `${chatsLeft} messages left` : "Get Premium"
        );
      }, 3000); // Промяна на текста на всеки 3 секунди, идеята ми е да видим как ще изглежда.
      return () => clearInterval(interval);
    } else {
      setButtonText("Premium");
    }
  }, [chatsLeft]);

  const handlePress = () => {
    navigation.navigate("Subscription");
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={tw`bg-blue-500 py-2 px-4 rounded-full`}
    >
      <Animatable.Text
        animation="slideInRight"
        duration={400}
        key={buttonText} // Промяна на ключа при промяна на текста, за да се активира анимацията
        style={tw`text-white font-bold`}
      >
        {buttonText}
      </Animatable.Text>
    </TouchableOpacity>
  );
};

export default HeaderButton;
