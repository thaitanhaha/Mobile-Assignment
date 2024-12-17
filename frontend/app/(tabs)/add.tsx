import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import HeaderComponent from '@/components/HeaderComponent';

function BudgetTab() {
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
        <TextInput style={[styles.input, { flex: 1 }]} value={amount} onChangeText={setAmount} keyboardType="numeric"/>
        <Picker selectedValue={currency} style={styles.amountpicker} onValueChange={(itemValue) => setCurrency(itemValue)}>
          <Picker.Item label="PLN" value="PLN" />
          <Picker.Item label="USD" value="USD" />
        </Picker>
      </View>
      <Text style={styles.note}>Enter the amount of money.</Text>

      {/* Name Section */}
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName}/>
      <Text style={styles.note}>Enter the budget's name.</Text>

      <Text style={styles.label}>Category</Text>
      <Picker selectedValue={category} style={styles.categorypicker} onValueChange={(itemValue) => setCategory(itemValue)}>
        <Picker.Item label="General" value="General" />
        <Picker.Item label="Food" value="Food" />
        <Picker.Item label="Shopping" value="Shopping" />
      </Picker>
      <Text style={styles.note}>Choose one category.</Text>

      <Text style={styles.label}>Method</Text>
      <View style={styles.methodContainer}>
        <TouchableOpacity
          style={[
            styles.methodOption,
            method === 'Cash' && styles.methodOptionActive,
          ]}
          onPress={() => setMethod('Cash')}
        >
          <Text style={styles.methodText}>💵 Cash</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.methodOption,
            method === 'Momo' && styles.methodOptionActive,
          ]}
          onPress={() => setMethod('Momo')}
        >
          <Text style={styles.methodText}>📱 Momo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ExpenseTab() {
  const [expenseName, setExpenseName] = useState('');
  return (
    <View style={styles.tabContainer}>
      <Text style={styles.label}>Expense Name</Text>
      <TextInput
        style={styles.input}
        value={expenseName}
        onChangeText={setExpenseName}
        placeholder="Enter expense name"
      />
    </View>
  );
}

function MGTab() {
  const [goal, setGoal] = useState('');
  return (
    <View style={styles.tabContainer}>
      <Text style={styles.label}>Margin/Goal</Text>
      <TextInput
        style={styles.input}
        value={goal}
        onChangeText={setGoal}
        placeholder="Set your goal"
      />
    </View>
  );
}

export default function App() {
  const [selectedTab, setSelectedTab] = useState('Budget');

  let CurrentTabComponent;
  if (selectedTab === 'Budget') CurrentTabComponent = BudgetTab;
  if (selectedTab === 'Expense') CurrentTabComponent = ExpenseTab;
  if (selectedTab === 'MG') CurrentTabComponent = MGTab;

  return (
    <View style={styles.container}>
      <HeaderComponent />
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Budget' && styles.activeTab]}
          onPress={() => setSelectedTab('Budget')}
        >
          <Text style={[styles.tabText, selectedTab === 'Budget' && styles.activeTabText]}>Budget</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Expense' && styles.activeTab]}
          onPress={() => setSelectedTab('Expense')}
        >
          <Text style={[styles.tabText, selectedTab === 'Expense' && styles.activeTabText]}>Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'MG' && styles.activeTab]}
          onPress={() => setSelectedTab('MG')}
        >
          <Text style={[styles.tabText, selectedTab === 'MG' && styles.activeTabText]}>M/G</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {CurrentTabComponent && <CurrentTabComponent />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', 
  },
  tabsContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'black',
    marginTop: 20,
  },
  tab: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#E6E9EE',
  },
  activeTab: {
    backgroundColor: 'white',
  },
  activeTabText: {
    color: 'black',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C4C9CF',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
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
  methodContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
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
  note: {
    fontSize: 12,
    marginBottom: 16,
  }
});
