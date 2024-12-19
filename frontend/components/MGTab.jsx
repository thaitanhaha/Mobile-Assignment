import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function ExpenseTab() {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('PLN');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('General');
  const [method, setMethod] = useState('Cash');

  return (
    <View style={styles.tabContainer}>
      {/* Amount Section */}
      <Text style={styles.label}>Amount</Text>
      <View style={styles.inputContainer}>
        <TextInput style={[styles.input, { flex: 1 }]} value={amount} onChangeText={setAmount} keyboardType="numeric" />
        <Picker selectedValue={currency} style={styles.amountpicker} onValueChange={(itemValue) => setCurrency(itemValue)}>
          <Picker.Item label="PLN" value="PLN" />
          <Picker.Item label="USD" value="USD" />
        </Picker>
      </View>
      <Text style={styles.note}>Enter the amount of money.</Text>

      {/* Name Section */}
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.note}>Enter the budget's name.</Text>

      <Text style={styles.label}>Category</Text>
      <Picker selectedValue={category} style={styles.categorypicker} onValueChange={(itemValue) => setCategory(itemValue)}>
        <Picker.Item label="General" value="General" />
        <Picker.Item label="Food" value="Food" />
        <Picker.Item label="Shopping" value="Shopping" />
      </Picker>
      <Text style={styles.note}>Choose one category.</Text>

      <Text style={styles.label}>Margin/Goal</Text>
      <View style={styles.methodContainer}>
        <TouchableOpacity
          style={[styles.methodOption, method === 'Cash' && styles.methodOptionActive]}
          onPress={() => setMethod('Cash')}
        >
          <Text style={styles.methodText}>Margin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.methodOption, method === 'Momo' && styles.methodOptionActive]}
          onPress={() => setMethod('Momo')}
        >
          <Text style={styles.methodText}>Goal</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.note}>Choose between a spending limit or a saving goal.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    marginTop: 0,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountpicker: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  categorypicker: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  note: {
    fontSize: 12,
    marginBottom: 16,
  },
  methodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  methodOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: '#f9f9f9',
  },
  methodOptionActive: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  methodText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});
