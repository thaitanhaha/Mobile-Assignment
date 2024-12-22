import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import HeaderComponent from '@/components/HeaderComponent';
import BudgetTab from '@/components/BudgetTab';
import ExpenseTab from '@/components/ExpenseTab';
import MGTab from '@/components/MGTab';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function App() {
  const [selectedTab, setSelectedTab] = useState('Budget');

  let CurrentTabComponent;
  if (selectedTab === 'Budget') CurrentTabComponent = BudgetTab;
  if (selectedTab === 'Expense') CurrentTabComponent = ExpenseTab;
  if (selectedTab === 'MG') CurrentTabComponent = MGTab;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
        {CurrentTabComponent && <CurrentTabComponent/>}
      </View>
    </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: wp('5%'),
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
});
