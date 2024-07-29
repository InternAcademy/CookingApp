import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text } from "react-native";
import tw from "twrnc";
import * as Animatable from "react-native-animatable";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const HeaderButton = () => {
  const [buttonText, setButtonText] = useState("Вземи PLUS");
  const [animation, setAnimation] = useState(null);

  const chatsLeft = useSelector(
    (state) => state.user.role.limitations.chatGeneration
  );
  const role = useSelector((state) => state.user.role.type);
  const navigation = useNavigation();
  const isDarkTheme = useSelector((state) => state.ui.isDarkTheme);

  useEffect(() => {
    if (role === "Free") {
      setButtonText("Get Premium");
      setAnimation("slideInDown"); //! Initial animation for "Get Premium"

      const timeout = setTimeout(() => {
        setButtonText(`${chatsLeft} messages left`);
        setAnimation("slideInDown"); //*Animation for the "chatsLeft"

        const revertTimeout = setTimeout(() => {
          setButtonText("Get Premium");
          setAnimation("slideInDown"); //* Animation for reverting back to "Get Premium"
        }, 2000); //! Revert after 2 second

        return () => clearTimeout(revertTimeout);
      }, 0); //! Trigger animation immediately when chatsLeft changes

      return () => clearTimeout(timeout);
    } else {
      setButtonText("Premium");
      setAnimation(null); //! No animation for Premium
    }
  }, [chatsLeft, role]);

  const handlePress = () => {
    navigation.navigate("Subscription");
  };

  return (
    <TouchableOpacity onPress={handlePress} style={tw`mt-1`}>
      <Animatable.Text
        animation={animation}
        duration={300}
        onAnimationEnd={() => setAnimation(null)} //!Reset animation state after animation ends
        style={tw`border flex font-medium py-2 w-34 text-center rounded-[10px] ${
          isDarkTheme
            ? "text-white border-slate-100/10 bg-slate-100/10"
            : "border-black text-black"
        }`}
      >
        {buttonText}
      </Animatable.Text>
    </TouchableOpacity>
  );
};

export default HeaderButton;
