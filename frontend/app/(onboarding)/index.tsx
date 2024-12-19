import React, { useState } from 'react';
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
  
  const [activeIndex, setActiveIndex] = useState(0);

  const handleIndexChanged = (index: React.SetStateAction<number>) => {
    setActiveIndex(index);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${(activeIndex + 1) / 3 * 100}%` }]} />
        </View>
      </View>

      <Swiper
        style={styles.wrapper}
        loop={false}
        onIndexChanged={handleIndexChanged}
      >
        {/* Page 1 */}
        <View style={styles.slide}>
          <Image source={require('../../assets/images/onboarding1.png')} style={styles.image} resizeMode="contain" />
          <Text style={styles.title}>Unplanned expense?</Text>
          <Text style={styles.text}>
            Create an <Text style={{ color: '#aaa' }}>adaptive strategy</Text> based on your spending.
          </Text>
          <TouchableOpacity style={styles.nextButton}>
            <Text style={styles.nextText}>NEXT</Text>
          </TouchableOpacity>
        </View>

        {/* Page 2 */}
        <View style={styles.slide}>
          <Image source={require('../../assets/images/onboarding2.png')} style={styles.image} resizeMode="contain"/>
          <Text style={styles.title}>Stay Organized</Text>
          <Text style={styles.text}>
            Keep track of your tasks and projects seamlessly.
          </Text>
          <TouchableOpacity style={styles.nextButton} onPress={handleGetStarted}>
            <Text style={styles.nextText}>NEXT</Text>
          </TouchableOpacity>
        </View>

        {/* Page 3 */}
        <View style={styles.slide}>
          <Image source={require('../../assets/images/onboarding3.png')} style={styles.image} resizeMode="contain"/>
          <Text style={styles.title}>Get Started</Text>
          <Text style={styles.text}>
            Join us and explore the possibilities.
          </Text>
          <TouchableOpacity style={styles.nextButton} onPress={handleGetStarted}>
            <Text style={styles.nextText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 8,
    backgroundColor: '#ddd',
    marginTop: 50,
    width: '75%',
    borderRadius: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  wrapper: {},
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    marginBottom: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: "#9AEF5E",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
    width: 200,
  },
  nextText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default OnboardingScreen;
