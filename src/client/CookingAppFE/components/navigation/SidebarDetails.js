import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useWindowDimensions } from 'react-native';
import tw from 'twrnc';
import { useTheme } from '../../context/ThemeContext';

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const window = useWindowDimensions();
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      window.width <= 720 ? setOpen(false) : setOpen(true);
    };

    handleResize();
  }, [window]);

  return (
    <View style={[styles.sidebar, { width: open ? 256 : 64 }, tw`${isDarkTheme ? 'bg-[#202020]' : 'bg-white'}`]}>
      <View style={styles.header}>
        <View style={styles.headerContent}>{open && <Image source={require('../../assets/NavigationBar/previous2.png')} style={styles.icon} />}</View>
        <TouchableOpacity onPress={() => setOpen(!open)}>
          <Text style={[tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`, styles.toggleIcon]}>{open ? '×' : '≡'}</Text>
        </TouchableOpacity>
      </View>

      {open && (
        <ScrollView style={styles.scrollView}>
          <View style={styles.section}>
            <Text style={[tw`${isDarkTheme ? 'text-white' : 'text-gray-700'} ml-2 mt-4`, styles.title]}>Recent Chats</Text>
            <View style={styles.recipeContainer}>
              <Text style={[tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`, styles.recipeTitle]}>To make a delicious lava cake, follow these steps:</Text>
              <Text style={tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`}>1. Prepare Ingredients:</Text>
              <Text style={[styles.bullet, tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`]}>• 4 ounces of semi-sweet chocolate</Text>
              <Text style={[styles.bullet, tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`]}>• 1/2 cup of unsalted butter</Text>
              <Text style={[styles.bullet, tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`]}>• 1 cup of powdered sugar</Text>
              <Text style={[styles.bullet, tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`]}>• 2 large eggs</Text>
              <Text style={[styles.bullet, tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`]}>• 2 large egg yolks</Text>
              <Text style={[styles.bullet, tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`]}>• 1 teaspoon of vanilla extract</Text>
              <Text style={[styles.bullet, tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`]}>• 1/4 cup of all-purpose flour</Text>
              <Text style={tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`}>2. Melt Chocolate and Butter:</Text>
              <Text style={[styles.bullet, tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`]}>• In a microwave-safe bowl, melt the chocolate and butter together in 30-second intervals, stirring each time until smooth.</Text>
              <Text style={tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`}>3. Combine Ingredients:</Text>
              <Text style={[styles.bullet, tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`]}>• Whisk in powdered sugar until fully incorporated.</Text>
              <Text style={[styles.bullet, tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`]}>• Add eggs and egg yolks, then vanilla, and mix until smooth.</Text>
              <Text style={[styles.bullet, tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`]}>• Gently stir in flour until just combined.</Text>
              <Text style={tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`}>4. Prepare Ramekins:</Text>
              <Text style={[styles.bullet, tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`]}>• Grease four 6-ounce ramekins and dust them with cocoa powder.</Text>
              <Text style={[styles.bullet, tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`]}>• Divide the batter evenly among the ramekins.</Text>
              <Text style={tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`}>5. Bake:</Text>
              <Text style={[styles.bullet, tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`]}>• Preheat your oven to 425°F (220°C).</Text>
              <Text style={[styles.bullet, tw`${isDarkTheme ? 'text-white' : 'text-gray-700'}`]}>• Place the ramekins on a baking sheet and bake for 12-14 minutes until the edges are firm but the center is still soft.</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    flexDirection: 'column',
    height: '100%',
    padding: 16
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: 16,
    height: 16
  },
  toggleIcon: {
    fontSize: 30 // Промени размера на иконата
  },
  section: {
    flexDirection: 'column',
    paddingLeft: 4,
    paddingRight: 4
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  recipeContainer: {
    marginTop: 16
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  bullet: {
    marginLeft: 16,
    marginBottom: 4
  },
  scrollView: {
    paddingRight: 16
  }
});

export default Sidebar;
