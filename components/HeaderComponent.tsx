import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const HeaderComponent = () => {
  return (
    <View style={styles.container}>
      {/* Left-Aligned Avatar */}
      <View style={styles.profileIcon}>
        <Image
          source={{ uri: 'https://www.shareicon.net/data/128x128/2016/09/15/829459_man_512x512.png' }}
          style={styles.image}
        />
      </View>

      {/* Right-Aligned Button and Notification Bell */}
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Earn $115</Text>
        </TouchableOpacity>
        <View style={styles.notificationBell}>
          <Image
            source={require('../assets/images/favicon.png')}
            style={styles.image}
          />
        </View>
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
    backgroundColor: '#32CD32',
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
    marginLeft: 10,
  },
});

export default HeaderComponent;
