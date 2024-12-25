import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import * as Sentry from '@sentry/react-native';
import ErrorModal from "../components/ErrorModal";
import SuccessModal from "../components/SuccessModal";
import { useRouter } from 'expo-router';

export default function BudgetTab() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [name, setName] = useState('');
  
  /* Category selection (C) */
  const [category, setCategory] = useState('General');
  const [openC, setOpenC] = useState(false);
  const [itemsC, setItemsC] = useState([
    { label: 'Bills', value: 'Bills' },
    { label: 'Cash', value: 'Cash' },
    { label: 'Eating out', value: 'Eating out' },
    { label: 'Entertainment', value: 'Entertainment' },
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

  const handleSave = () => {
    const budgetData = {
      totalAmount: parseFloat(amount),
      date: '2024-12-25',
      category: category,
      items: [{ name: name.trim(), price: parseFloat(amount) }],
    };
  
    if (!budgetData.totalAmount || !budgetData.items) {
      setModalMessage("All fields are required!");
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 1000);
      return;
    }
  
    axios
      .post('https://mobile-assignment.onrender.com/budgets', budgetData)
      .then((res) => {
        console.log('Budget saved:', res.data);
        Sentry.captureMessage("Budget saved successfully");
        setTimeout(() => {
          handleSuccess()
          window.location.reload();
          router.replace('/add?tab=Budget')
        }, 1000);
      })
      .catch((err) => {
        console.error('Error saving budget:', err);
        Sentry.captureException(err);
      });
  };

  const handleSuccess = () => {
    setSuccessModalVisible(true);
    setTimeout(() => {
      setSuccessModalVisible(false);
    }, 1000);
  };

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
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Add Budget</Text>
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
});
