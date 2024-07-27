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
    <TouchableOpacity onPress={handlePress} style={tw`mt-1 `}>
      <Animatable.Text
        animation="slideInDown"
        duration={300}
        key={buttonText} // Промяна на ключа при промяна на текста, за да се активира анимацията
        style={tw`border flex  font-medium py-2 w-34 text-center rounded-[10px] ${isDarkTheme ? "  text-white border-slate-100/10 bg-slate-100/10 " : "border-black text-black"}     `}
      >
        {buttonText}
      </Animatable.Text>
    </TouchableOpacity>
  );
};

export default HeaderButton;
