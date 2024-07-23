
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';

const HeaderButton = () => {
  const [buttonText, setButtonText] = useState('Вземи PLUS');
  const isDarkTheme = useSelector(state => state.ui.isDarkTheme);

  useEffect(() => {
    const interval = setInterval(() => {
      setButtonText(prev => prev === 'Вземете PLUS ' ? '3 Tokens left' : 'Вземете PLUS ');
    }, 3000); // Промяна на текста на всеки 3 секунди, идеята ми е да видим как ще изглежда.
    return () => clearInterval(interval);
  }, []);

  const handlePress = () => {
    
    console.log(`Push me hardERRRR!`);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={tw`mt-1 ml-2 `}>
      <Animatable.Text
        animation="slideInDown"
        duration={300}
        key={buttonText} // Промяна на ключа при промяна на текста, за да се активира анимацията
        style={tw`border font-medium py-2 w-34 text-center rounded-[10px] ${isDarkTheme ? "  text-white border-slate-100/10 bg-slate-100/10 " : "border-black text-black"}     `}
      >
        {buttonText}
      </Animatable.Text>
    </TouchableOpacity>
  );
};

export default HeaderButton;
