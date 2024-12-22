import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default function RegisterScreen() {
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text>{"<"}</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>Enter your email address</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text style={styles.terms}>
        By registering, you accept our{" "}
        <Text style={styles.link}>Terms of Use</Text> and{" "}
        <Text style={styles.link}>Privacy Policy</Text>
      </Text>
      <View style={{flex: 1}}></View>
      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextText}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  terms: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  link: {
    color: "#000",
    fontWeight: 'bold',
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
});
