import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import * as Sentry from '@sentry/react-native';
import ErrorModal from "../components/ErrorModal";
import SuccessModal from "../components/SuccessModal";
import { useRouter } from 'expo-router';

export default function MGSTab() {
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

  const [marginGoal, setMarginGoal] = useState('Margin');
  const [selectedRange, setSelectedRange] = useState('A month');
  const [chosenDate, setChosenDate] = useState(new Date());

  const handleSuggestion = () => {
    setAmount(100);
  }

  const handleSave = () => {
    const goalData = {
      totalAmount: parseFloat(amount),
      date: '2024-12-25',
      category: category,
      items: [{ name: name.trim(), price: parseFloat(amount) }],
      purpose: 'Purpose',
      range: selectedRange,
      mgDate: '2025-5-5',
    };
  
    if (!goalData.totalAmount || !goalData.items) {
      setModalMessage("All fields are required!");
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 1000);
      return;
    }
  
    axios
      .post('https://mobile-assignment.onrender.com/mgs', goalData)
      .then((res) => {
        console.log('MGS saved:', res.data);
        Sentry.captureMessage("MGS saved successfully");
        setTimeout(() => {
          handleSuccess();
        }, 1000);
      })
      .catch((err) => {
        console.error('Error saving goals:', err);
        Sentry.captureException(err);
      });
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
      setMarginGoal('Margin');
      setSelectedRange('A month');
      setChosenDate(new Date());
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

          {/* Margin/Goal Section */}
          <Text style={styles.label}>Margin/Goal</Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, marginGoal === 'Margin' && styles.activeToggleButton]}
              onPress={() => setMarginGoal('Margin')}
            >
              <Text style={[styles.toggleButtonText, marginGoal === 'Margin' && styles.activeToggleButtonText]}>Margin</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, marginGoal === 'Goal' && styles.activeToggleButton]}
              onPress={() => setMarginGoal('Goal')}
            >
              <Text style={[styles.toggleButtonText, marginGoal === 'Goal' && styles.activeToggleButtonText]}>Goal</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.note}>Choose between a spending limit or a saving goal.</Text>

          {/* Range Section */}
          <Text style={styles.label}>Range</Text>
          <View style={styles.toggleContainer}>
            {['A week', 'A month', 'A quarter'].map((range) => (
              <TouchableOpacity
                key={range}
                style={[styles.toggleButton, selectedRange === range && styles.activeToggleButton]}
                onPress={() => setSelectedRange(range)}
              >
                <Text style={[styles.toggleButtonText, selectedRange === range && styles.activeToggleButtonText]}>{range}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.note}>Choose a range to set a limit.</Text>

          {/* Date Picker */}
          <Text style={styles.label}>Target Date</Text>
          <DateTimePicker
            value={chosenDate}
            mode="date"
            display="inline"
            themeVariant="light"
            style={{
              backgroundColor: '#FFFFFF', 
              borderRadius: 10,
              borderWidth: 1,
              padding: 10,
            }}
            textColor="#000000" 
            accentColor="#BA82F1" 
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                setChosenDate(selectedDate);
              }
            }}
          />
          <Text style={[styles.note, {paddingTop: 15}]}>Pick a date.</Text>
          {/* Suggest Button */}
          <TouchableOpacity style={styles.button} onPress={handleSuggestion}>
            <Text style={styles.buttonText}>Suggest</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button_save} onPress={handleSave} >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
  note: {
    fontSize: 12,
    color: '#777',
    marginBottom: 25,
    paddingTop: 5,
  },
  button: {
    backgroundColor: '#BA82F1',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: 200,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  toggleButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f8f8f8',
  },
  activeToggleButton: {
    backgroundColor: '#BA82F1',
    borderColor: '#BA82F1',
  },
  toggleButtonText: {
    fontSize: 14,
    color: '#333',
  },
  activeToggleButtonText: {
    color: '#000000',
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
});
