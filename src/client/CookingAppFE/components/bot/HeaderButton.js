
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';
import * as Animatable from 'react-native-animatable';

const HeaderButton = () => {
  const [buttonText, setButtonText] = useState('Вземи PLUS');

  useEffect(() => {
    const interval = setInterval(() => {
      setButtonText(prev => prev === 'Вземи PLUS' ? 'Нов текст' : 'Вземи PLUS');
    }, 3000); // Промяна на текста на всеки 3 секунди, идеята ми е да видим как ще изглежда.
    return () => clearInterval(interval);
  }, []);

  const handlePress = () => {
    
    console.log(`Push me hardERRRR!`);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={tw`bg-blue-500 py-2 px-4 rounded-full`}>
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
