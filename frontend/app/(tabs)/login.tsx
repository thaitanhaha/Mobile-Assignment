import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const handleRegister = () => {
    router.replace('/(tabs)/register');
  };
  const handleForgotPassword = () => {
    router.replace('/(tabs)/register');
  };


  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
            source={require('../../assets/images/Mooney.png')}
            resizeMode="contain"
            style={{width: '90%'}}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={require('../../assets/icons/email.svg')} style={styles.icon}/>
        <TextInput style={styles.input} placeholder="Email" value={email} 
            onChangeText={setEmail} keyboardType="email-address"/>
        <TouchableOpacity onPress={() => setEmail("")}>
          <Image source={require('../../assets/icons/clear.svg')} style={{width: 30, height: 30}}/>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Image source={require('../../assets/icons/password.svg')} style={styles.icon}/>
        <TextInput style={styles.input} placeholder="Password" secureTextEntry={!showPassword} value={password} 
            onChangeText={setPassword} />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image source={require('../../assets/icons/password_hide.svg')} style={{width: 30, height: 30}}/>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextText}>NEXT</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>or</Text>
      <TouchableOpacity style={styles.googleButton}>
        <Image source={require('../../assets/icons/google.svg')} style={{width: 25, height: 25, marginRight: 10}}/>
        <Text style={styles.googleText}>CONTINUE WITH GOOGLE</Text>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.registerText}>
          DON'T HAVE AN ACCOUNT?
        </Text>
        <TouchableOpacity onPress = {(handleRegister)}>
          <Text style={styles.register}> REGISTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
    paddingLeft: 25,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 8,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: 'medium',
    marginBottom: 20,
    textDecorationLine: 'underline'
  },
  nextButton: {
    backgroundColor: "#9AEF5E",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  nextText: {
    color: "#000",
    fontWeight: "bold",
  },
  orText: {
    textAlign: "center",
    marginBottom: 10,
    color: "#2F5711",
    fontWeight: 'bold'
  },
  googleButton: {
    backgroundColor: "#0E0F0C1F",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  googleText: {
    color: "#000",
    fontWeight: "bold",
  },
  registerText: {
    textAlign: "center",
    color: "#000",
  },
  register: {
    color: "#2F5711",
    fontWeight: "bold",
  },
  icon: {
    width: 40, 
    height: 40, 
    marginRight: 10
  },
});
