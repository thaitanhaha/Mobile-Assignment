import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Button, Image, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import { CameraView, Camera, useCameraPermissions, CameraType } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import ErrorModal from "../components/ErrorModal";
import SuccessModal from "../components/SuccessModal";
import { useRouter } from 'expo-router';
import { classifyText } from '../hooks/openAI';


export default function BudgetTab() {
  const router = useRouter();
  const [showCamera, setShowCamera] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  
  /* Category selection (C) */
  const [category, setCategory] = useState('General');
  const [openC, setOpenC] = useState(false);
  const [itemsC, setItemsC] = useState([
    { label: 'Bills', value: 'Bills' },
    { label: 'Cash', value: 'Cash' },
    { label: 'Eating out', value: 'Eating out' },
    { label: 'Entertainment', value: 'Entertainment' },
    { label: 'Expenses', value: 'Expenses' },
    { label: 'Family', value: 'Family' },
    { label: 'Groceries', value: 'Groceries' },
    { label: 'Housing', value: 'Housing' },
    { label: 'Investments', value: 'Investments' },
    { label: 'Personal care', value: 'Personal care' },
    { label: 'Salary', value: 'Salary' },
    { label: 'Savings', value: 'Savings' },
    { label: 'Shopping', value: 'Shopping' },
    { label: 'Transport', value: 'Transport' },
    { label: 'Trips', value: 'Trips' },
  ]);

  /* Amount Section (A) */
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('PLN');
  const [openA, setOpenA] = useState(false);
  const [itemsA, setItemsA] = useState([
    { label: 'PLN', value: 'PLN' },
    { label: 'USD', value: 'USD' },
  ]);

  /* Method */
  const [selectedMethod, setSelectedMethod] = useState(null);
  
  const handleSelect = (method) => {
    setSelectedMethod(method === selectedMethod ? null : method);
  };

  const handlePress = () => {
    setShowCamera(!showCamera);
  };

  const handleCapture = async () => {
    setCapturedPhoto(null);
    const camera = cameraRef.current;
    if (!camera) return;
    try {
      const data = await camera.takePictureAsync();
      setCapturedPhoto(data.uri);
      setShowCamera(false);
      let base64Image = '';
      if (data.uri.includes('.jpg') || data.uri.includes('.png')) {
        base64Image = await FileSystem.readAsStringAsync(data.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
      }
      else {
        base64Image = data.uri;
      }
      const text = await recognizeText(base64Image);
      const letters = text.match(/[a-zA-Z]/g) || [];
      const numbers = text.match(/\d/g) || [];
      setName(letters.join(''));
      setAmount(numbers.join(''));
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const recognizeText = async (imageUri) => {
    let final = 'ERROR';
    setLoading(true);
    try {
      const base64Content = imageUri.replace(/^data:image\/\w+;base64,/, '');
      const url = `https://vision.googleapis.com/v1/images:annotate?key=${process.env.EXPO_PUBLIC_GOOGLE_VISION_API_KEY}`;
      const requestBody = {
        requests: [
          {
            image: { content: base64Content },
            features: [{ type: 'TEXT_DETECTION' }],
          },
        ],
      };
  
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json();
      const detections = data.responses[0].textAnnotations;
      if (detections) {
        final = detections[0].description;
        setTimeout(() => {
          handleClassifyThrottled(detections[0].description);
        }, 1000);
      } else {
        final = 'No text detected';
      }
    } catch (error) {
      console.error('Error with Google Vision API:', error);
      throw error;
    } finally {
      setLoading(false);
      return final;
    }
  };

  let isRequestInProgress = false;

  const handleClassifyThrottled = async (text) => {
    if (isRequestInProgress) return;

    isRequestInProgress = true;
    try {
      await handleClassify(text);
    } catch (error) {
      console.error('Error in classification:', error);
    } finally {
      isRequestInProgress = false;
    }
  };

  const handleSave = () => {
    console.log(itemsC);
    const expenseData = {
      totalAmount: parseFloat(amount),
      date: '2024-12-25',
      category: category,
      items: [{ name: name.trim(), price: parseFloat(amount) }],
    };
  
    if (!expenseData.totalAmount || !expenseData.items) {
      setModalMessage("All fields are required!");
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 1000);
      return;
    }
  
    axios
      .post('https://mobile-assignment.onrender.com/expenses', expenseData)
      .then((res) => {
        console.log('Expense saved:', res.data);
        setTimeout(() => {
          handleSuccess()
        }, 1000);
      })
      .catch((err) => {
        console.error('Error saving expense:', err);
      });
  };

  const handleClassify = async () => {
    try {
      const result = await classifyText(name);
      console.log(result);
      setCategory(result);
    } catch (error) {
      console.error('Classification failed:', error);
      setCategory('Error classifying input');
    }
  };

  const handleSuccess = () => {
    setSuccessModalVisible(true);
    setTimeout(() => {
      setSuccessModalVisible(false);
      setAmount('');
      setName('');
      setCategory('General');
      setCurrency('PLN');
      setSelectedMethod(null);
    }, 1000);
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permission_container}>
        <Text>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.buttonText}>Grant Permission</Text>
      </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ErrorModal
        visible={modalVisible}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />
      <SuccessModal
        visible={successModalVisible}
        message="Success!"
        onClose={() => setSuccessModalVisible(false)}
      />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 2, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.tabContainer}>
          {/* Amount Section */}
          <Text style={styles.label}>Amount</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 8 }]}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="Enter amount"
            />
            <DropDownPicker
              open={openA}
              value={currency}
              items={itemsA}
              setOpen={setOpenA}
              setValue={setCurrency}
              setItems={setItemsA}
              containerStyle={styles.dropdownContainer}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownList}
              listMode='SCROLLVIEW'
            />
          </View>
          <Text style={styles.note}>Enter the amount of money.</Text>

          <Text style={styles.label}>Name</Text>
          <View style={styles.inputContainer}>
            <TextInput style={[styles.input, { flex: 1 }]} value={name} onChangeText={setName} />
          </View>
          <Text style={styles.note}>Enter the budget's name.</Text>

          {/* Category Section */}
          <Text style={styles.label}>Category</Text>
          <DropDownPicker
            open={openC}
            value={category}
            items={itemsC}
            setOpen={setOpenC}
            setValue={setCategory}
            setItems={setItemsC}
            placeholder="General"
            containerStyle={{
              width: '100%',
              height: 50,
              marginBottom: 8,
            }}
            style={{
              backgroundColor: '#fafafa',
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
            }}
            dropDownStyle={{
              maxHeight: 200,
              overflow: 'hidden',
            }}
            listMode='SCROLLVIEW'
          />
          <Text style={styles.note}>Choose a category.</Text>

          <Text style={styles.label}>Method</Text>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.optionContainer}
              onPress={() => handleSelect('Cash')}
            >
              <View style={styles.optionContent}>
                <Text style={styles.optionText}>Cash</Text>
                {selectedMethod === 'Cash' && (
                  <Icon name="check" size={20} color="#4CAF50" />
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionContainer}
              onPress={() => handleSelect('Momo')}
            >
              <View style={styles.optionContent}>
                <Text style={styles.optionText}>Momo</Text>
                {selectedMethod === 'Momo' && (
                  <Icon name="check" size={20} color="#4CAF50" />
                )}
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.note}>Choose one payment method.</Text>
          <TouchableOpacity style={styles.button} onPress={handlePress} >
            <Text style={styles.buttonText}>Scan Receipt</Text>
          </TouchableOpacity>

          {showCamera && (
            <CameraView
              style={styles.camera}
              facing='back'
              ref={cameraRef}
            >
              <View style={styles.captureContainer}>
                <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
                  <Text style={styles.buttonText}>Scan</Text>
                </TouchableOpacity>
              </View>
            </CameraView>
          )}

          {loading && <ActivityIndicator size="large" color="#0000ff" />}
          
          {capturedPhoto && (
            <>
              <View style={{alignItems: 'center'}}>
                <Image source={{ uri: capturedPhoto }} style={styles.photo} />
              </View>
            </>
          )}

          <TouchableOpacity style={styles.button_save} onPress={handleSave} >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  permission_container: {
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 16,
    alignItems: 'center',
  },
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: -1,
  },
  dropdownContainer: {
    width: 90,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  dropdownList: {
    borderColor: '#ccc',
  },
  optionContainer: {
    marginVertical: -1,
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 0,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  note: {
    fontSize: 12,
    color: '#777',
    marginBottom: 25,
    paddingTop: 5,
  },
  button: {
    backgroundColor: '#FCE849',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    width: 200,
    alignSelf: 'center',
  },
  button_save: {
    backgroundColor: '#9AEF5E',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    width: 200,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
    width: '100%',
    height: 500,
  },
  captureContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: '#FF5733',
    padding: 15,
    borderRadius: 50,
  },
  photo: {
    width: 300,
    height: 400,
    marginTop: 10,
  },
});