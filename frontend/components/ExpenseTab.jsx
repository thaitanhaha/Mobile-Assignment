import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Button, Image, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import { CameraView, Camera, useCameraPermissions, CameraType } from 'expo-camera';
import * as Tesseract from 'tesseract.js';

export default function BudgetTab() {
  const [showCamera, setShowCamera] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [recognizedText, setRecognizedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  
  /* Category selection (C) */
  const [category, setCategory] = useState('General');
  const [openC, setOpenC] = useState(false);
  const [itemsC, setItemsC] = useState([
    { label: 'Bills', value: '1' },
    { label: 'Cash', value: '2' },
    { label: 'Eating out', value: '3' },
    { label: 'Entertainment', value: '4' },
    { label: 'Expenses', value: '5' },
    { label: 'Family', value: '6' },
    { label: 'Groceries', value: '7' },
    { label: 'Housing', value: '8' },
    { label: 'Investments', value: '9' },
    { label: 'Personal care', value: '10' },
    { label: 'Salary', value: '11' },
    { label: 'Savings', value: '12' },
    { label: 'Shopping', value: '13' },
    { label: 'Transport', value: '14' },
    { label: 'Trips', value: '15' },
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
      await recognizeText(data.uri);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const recognizeText = async (imageUri) => {
    setLoading(true);
    try {
      const result = await Tesseract.recognize(imageUri, 'eng', {
        logger: (info) => console.log(info),
      });
      setRecognizedText(result.data.text);
    } catch (error) {
      console.error('OCR Error: ', error);
    } finally {
      setLoading(false);
    }
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
                <Text>Recognized {recognizedText}</Text>
              </View>
            </>
          )}
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