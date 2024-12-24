import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import NotiSVG from '../assets/icons/noti.svg';

const HeaderComponent = () => {
  const router = useRouter();
  
  const handleNotifications = () => {
    router.replace('/notifications');
  };

  const handleSuggestion = () => {
    router.replace('/add?tab=MG');
  };

  const handleSettings = () => {
    router.replace('/settings');
  };

  return (
    <View style={styles.container}>
      {/* Left-Aligned Avatar */}
      <TouchableOpacity style={styles.profileIcon} onPress={handleSettings}>
        <Image
          source={{ uri: 'https://www.shareicon.net/data/128x128/2016/09/15/829459_man_512x512.png' }}
          style={styles.image}
        />
      </TouchableOpacity>

      {/* Right-Aligned Button and Notification Bell */}
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.button} onPress={handleSuggestion}>
          <Text style={styles.buttonText}>Get Suggestion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationBell} onPress={handleNotifications}>
          <NotiSVG style={{width: '60%', height: '60%', alignSelf: 'center',}}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Space between avatar and right-section
    padding: 10,
    backgroundColor: 'black',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#9AEF5E',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  notificationBell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6E9EE',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  },
});

export default HeaderComponent;
