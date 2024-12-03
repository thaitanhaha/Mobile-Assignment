import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { useRouter } from 'expo-router';

type RootStackParamList = {
  HomeScreen: undefined;
  OnboardingScreen: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OnboardingScreen'>;
};

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.replace('/(tabs)');
  };

  return (
    <Swiper style={styles.wrapper} loop={false} dot={<View style={styles.dot} />} activeDot={<View style={styles.activeDot} />}>
      {/* Page 1 */}
      <View style={styles.slide}>
        <Image source={{ uri: 'https://via.placeholder.com/200' }} style={styles.image} />
        <Text style={styles.title}>Welcome to Our App</Text>
        <Text style={styles.text}>Discover new features and enhance your productivity.</Text>
      </View>
      
      {/* Page 2 */}
      <View style={styles.slide}>
        <Image source={{ uri: 'https://via.placeholder.com/200' }} style={styles.image} />
        <Text style={styles.title}>Stay Organized</Text>
        <Text style={styles.text}>Keep track of your tasks and projects seamlessly.</Text>
      </View>
      
      {/* Page 3 */}
      <View style={styles.slide}>
        <Image source={{ uri: 'https://via.placeholder.com/200' }} style={styles.image} />
        <Text style={styles.title}>Get Started</Text>
        <Text style={styles.text}>Join us and explore the possibilities.</Text>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#007BFF',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
});

export default OnboardingScreen;
