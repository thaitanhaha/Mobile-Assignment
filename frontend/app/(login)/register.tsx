import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { OtpInput } from "react-native-otp-entry";
import { router } from "expo-router";
import ErrorModal from '../../components/ErrorModal';
import LeftArrowSVG from '../../assets/icons/leftarrow.svg';
import PasswordHideSVG from '../../assets/icons/password_hide.svg';

export default function RegisterScreen() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [otp, setOtp] = useState("");

  const handleNext = () => {
    if (step === 1) {
      if (email) {
        setStep(2)
      }
    } else if (step === 2) {
      setStep(3)
    } else if (step === 3) {
      if (password) {
        setStep(4)
      }
    } else if (step === 4) {
      setErrorModalVisible(true);
      setTimeout(() => {
        setErrorModalVisible(false);
      }, 1000);
      setStep(1)
    }
  }

  const handleResendOTP = () => {
    // resend OTP
  }

  const handleBack = () => {
    if (step === 1) {
      router.replace('/(login)')
    } else {
      setStep(step - 1)
    }
  }

  return (
    <View style={styles.container}>
      <ErrorModal
        visible={errorModalVisible}
        message="Feature will be updated soon!"
        onClose={() => setErrorModalVisible(false)}
      />

      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <LeftArrowSVG/>
      </TouchableOpacity>

      {step === 1 && (
        <>
          <Text style={styles.headerText}>Enter your email address</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </>
      )}
      
      {step === 2 && (
        <>
          <Text style={styles.headerText}>Verify your email with a code</Text>
          <OtpInput 
            numberOfDigits={4}
            focusColor={"#9FE870"}
            type="numeric"
            blurOnFilled={true}
            focusStickBlinkingDuration={500}
            onTextChange={(text) => setOtp(text)}
            onFilled={(text) => console.log(`OTP is ${text}`)}
            theme={{
              pinCodeContainerStyle: styles.pinCodeContainer,
              pinCodeTextStyle: styles.pinCodeText,
            }}
          />
          <TouchableOpacity style={styles.resendButton} onPress={handleResendOTP}>
            <Text style={styles.link}>Resend</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 3 && (
        <>
          <Text style={styles.headerText}>Create a password</Text>
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.inputText}
              placeholder="Enter your password" 
              secureTextEntry={!showPassword} value={password} 
              onChangeText={setPassword} 
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <PasswordHideSVG style={{width: 30, height: 30}} />
            </TouchableOpacity>
          </View>
          <Text style={styles.subText}>
            At least <Text style={styles.bold}>6 characters</Text>, containing both <Text style={styles.bold}>letters</Text> and <Text style={styles.bold}>numbers</Text>.
          </Text>
        </>
      )}

      {step === 4 && (
        <>
          <Text style={styles.headerText}>Confirm the password</Text>
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.inputText}
              placeholder="Enter your password" 
              secureTextEntry={!showConfirmPassword} value={confirmPassword} 
              onChangeText={setConfirmPassword} 
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <PasswordHideSVG style={{width: 30, height: 30}} />
            </TouchableOpacity>
          </View>
        </>
      )}

      <View style={{flex: 1}}></View>
      <Text style={styles.terms}>
        By registering, you accept our{" "}
        <Text style={styles.link}>Terms of Use</Text> and{" "}
        <Text style={styles.link}>Privacy Policy</Text>
      </Text>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
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
    width: 50, height: 50, borderRadius: 25,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    flexDirection: 'column', justifyContent: 'center'
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
    height: 48,
    paddingHorizontal: 12,
    paddingVertical: 8,
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
    textDecorationLine: "underline",
  },
  subText: {
    fontSize: 14,
    color: "#000",
    textAlign: "left",
    marginBottom: 20,
  },
  bold: {
    fontWeight: "bold",
  },
  nextButton: {
    backgroundColor: "#9AEF5E",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 12,
  },
  nextText: {
    color: "#000",
    fontWeight: "bold",
  },
  resendButton: {
    alignSelf: "center",
    marginTop: 48,
  },
  pinCodeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("18%"),
    height: hp("6%"),
    padding: 30,
  },
  pinCodeText: {
    fontSize: 24,
    fontWeight: 600,
    color: "#000",
    alignSelf: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  inputText: {
    flex: 1,
    height: 40,
    marginLeft: 8,
  }
});
