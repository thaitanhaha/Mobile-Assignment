import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import HeaderComponent from '@/components/HeaderComponent';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <HeaderComponent />

      <View style={styles.profileContainer}>
        <Text style={styles.profileTitle}>Profile</Text>
        <Image
          source={{ uri: 'https://www.shareicon.net/data/128x128/2016/09/15/829459_man_512x512.png' }}
          style={styles.profileImage}
        />
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Image source={require('../../assets/images/favicon.png')} style={styles.icon} />
          <View style={styles.rightContainer}>
            <Text style={styles.inputLabel}>Full name</Text>
            <View style={styles.inputRow}>
              <Text style={styles.inputValue}>Corin Reveck</Text>
              <TouchableOpacity style={styles.arrowButton}>
                <Text style={styles.arrowText}>→</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Image source={require('../../assets/images/favicon.png')} style={styles.icon} />
          <View style={styles.rightContainer}>
            <Text style={styles.inputLabel}>Full name</Text>
            <View style={styles.inputRow}>
              <Text style={styles.inputValue}>Corin Reveck</Text>
              <TouchableOpacity style={styles.arrowButton}>
                <Text style={styles.arrowText}>→</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Image source={require('../../assets/images/favicon.png')} style={styles.icon} />
          <View style={styles.rightContainer}>
            <Text style={styles.inputLabel}>Full name</Text>
            <View style={styles.inputRow}>
              <Text style={styles.inputValue}>Corin Reveck</Text>
              <TouchableOpacity style={styles.arrowButton}>
                <Text style={styles.arrowText}>→</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', 
    paddingTop: ('5%'),
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 16,
  },
  profileTitle: {
    fontSize: 24,
    color: 'white',
    marginTop: 10,
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    marginTop: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 8,
  },
  inputRow: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 5
  },
  icon: {
    width: 30, 
    height: 30, 
    marginRight: 10
  },
  rightContainer: {
    flex: 1,
    paddingLeft: 8,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  inputValue: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
  arrowButton: {
    paddingLeft: 10,
  },
  arrowText: {
    fontSize: 20,
    color: '#333',
  },
});
