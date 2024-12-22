import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
            source={require('../../assets/images/favicon.png')}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={require('../../assets/images/favicon.png')} style={styles.icon}/>
        <TextInput style={styles.input} placeholder="Email" value={email} 
            onChangeText={setEmail} keyboardType="email-address"/>
        <TouchableOpacity style={styles.clearButton} onPress={() => setEmail("")}>
        <Text>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Image source={require('../../assets/images/favicon.png')} style={styles.icon}/>
        <TextInput style={styles.input} placeholder="Password" secureTextEntry={!showPassword} value={password} 
            onChangeText={setPassword} />
        <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)}>
          <Text>{showPassword ? "🙈" : "👁"}</Text>
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
        <Image source={require('../../assets/images/favicon.png')} style={{width: 25, height: 25, marginRight: 10}}/>
        <Text style={styles.googleText}>CONTINUE WITH GOOGLE</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.registerText}>
          DON'T HAVE AN ACCOUNT? <Text style={styles.register}>REGISTER</Text>
        </Text>
      </TouchableOpacity>
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
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginLeft: 8,
  },
  clearButton: {
    padding: 10,
  },
  eyeButton: {
    padding: 10,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: 'bold',
    marginBottom: 20,
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
    color: "#000",
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
	width: 30, 
	height: 30, 
	marginRight: 10
},
});
