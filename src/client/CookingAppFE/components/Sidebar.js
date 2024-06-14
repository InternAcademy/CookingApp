import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useWindowDimensions } from 'react-native';
import tw from 'twrnc';

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const window = useWindowDimensions();

  useEffect(() => {
    const handleResize = () => {
      window.width <= 720 ? setOpen(false) : setOpen(true);
    };

    handleResize();
  }, [window]);

  return (
    <View style={[styles.sidebar, { width: open ? 256 : 64 }]}>
      <View style={styles.header}>
        <View style={styles.headerContent}>{open && <Image source={require('../assets/back2.png')} style={styles.icon} />}</View>
        <TouchableOpacity onPress={() => setOpen(!open)}>
          <Text style={[tw`text-gray-700`, styles.toggleIcon]}>{open ? '×' : '≡'}</Text>
        </TouchableOpacity>
      </View>

      {open && (
        <>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={tw`text-gray-700`}>New chat</Text>
          </TouchableOpacity>

          <View style={styles.section}>
            <Text style={tw`text-gray-700 ml-2 mt-4`}>Recent Chats</Text>
            {/* Add your recent chats items here */}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    height: '100%'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16
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
    fontSize: 20 // Промени размера на иконата
  },
  menuItem: {
    padding: 16,
    borderBottomColor: '#d1d5db',
    borderBottomWidth: 1
  },
  section: {
    flexDirection: 'column',
    padding: 16,
    borderBottomColor: '#d1d5db',
    borderBottomWidth: 1
  }
});

export default Sidebar;
