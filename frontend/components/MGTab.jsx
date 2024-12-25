import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function BudgetTab() {
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

  /* Margin/Goal */
  const [marginGoal, setMarginGoal] = useState('Margin');

  /* Range */
  const [selectedRange, setSelectedRange] = useState('A month');

  /* Date */
  const [chosenDate, setChosenDate] = useState(new Date());

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
              backgroundColor: '#FFFFFF', // Nền trắng
              borderRadius: 10,
              borderWidth: 1,
              padding: 10,
            }}
            textColor="#000000" // Chữ đen
            accentColor="#BA82F1" // Màu #BA82F1 cho các nút tương tác
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                setChosenDate(selectedDate);
              }
            }}
          />
          <Text style={[styles.note, {paddingTop: 15}]}>Pick a date.</Text>
          {/* Suggest Button */}
          <TouchableOpacity style={styles.button} onPress={null}>
            <Text style={styles.buttonText}>Suggest</Text>
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
    width: 150,
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
});
