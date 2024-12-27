import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import HeaderComponent from '@/components/HeaderComponent';
import EntriesTab from '@/components//EntriesTab';
import ChartsTab from '@/components/ChartsTab';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TotalSavingSVG from '../../assets/icons/total_saving.svg';
import PlusSVG from '../../assets/icons/plus.svg';
import axios from 'axios';

type Entry = {
  _id: string;
  totalAmount: number;
  date: string;
  category: string;
  items: any[];
};

export default function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState('Entries');
  const [showCards, setShowCards] = useState(true);
  const [entries, setEntries] = useState<Entry[]>([]);

  const handleDeleteEntry = (entryId: string) => {
    setEntries((prevEntries) => prevEntries.filter((entry) => entry._id !== entryId));
  };
  
  const getEntries = async () => {
    try {
        const expensesResponse = await axios.get('https://mobile-assignment.onrender.com/expenses');
        console.log(expensesResponse.data);
        const modifiedEntries: Entry[] = expensesResponse.data.map((entry: Entry) => ({
          ...entry,
          totalAmount: -entry.totalAmount,
        }));
        console.log(modifiedEntries);

        const budgetsResponse = await axios.get('https://mobile-assignment.onrender.com/budgets');
        console.log(budgetsResponse.data);

        const temp = [...budgetsResponse.data, ...modifiedEntries];
        console.log(temp);
        setEntries(temp);
    } catch (err) {
        console.log(err);
    }
  };
  
  useEffect(() => {
    getEntries();
  }, []);

  const chartData = [5.25, 5.42, 5.29, 5.38, 5.335];

  const handleEntriesPress = () => {
    if (selectedTab === 'Entries') {
      setShowCards((prev) => !prev);
    } else {
      setSelectedTab('Entries');
    }
  };
  const handleChartsPress = () => {
    if (selectedTab === 'Charts') {
      setShowCards((prev) => !prev);
    } else {
      setSelectedTab('Charts');
    }
  };

  let CurrentTabComponent = null;
  if (selectedTab === 'Entries') CurrentTabComponent = 
    <EntriesTab entries={entries} showDelete={!showCards} onDeleteEntry={handleDeleteEntry} />;
  if (selectedTab === 'Charts') CurrentTabComponent = <ChartsTab data={chartData} />;

  return (
    <View style={styles.container}>
      <HeaderComponent />

      {showCards ? (
        <View style={styles.content}>
          <Text style={styles.title}>Happy saving!</Text>
          <View style={styles.selections}>
            <TouchableOpacity style={styles.selection}>
              <Text style={styles.selectionText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.selection}>
              <Text style={styles.selectionText}>Favourite</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.cards}>
              <View style={[styles.card, { backgroundColor: '#BAEC97' }]}>
                <TouchableOpacity style={styles.plus}>
                  <PlusSVG />
                </TouchableOpacity>
                <View style={{ marginLeft: 16, marginBottom: 16 }}>
                  <Text style={styles.cardTitle}>Total</Text>
                  <Text style={styles.cardDescription}>Something...</Text>
                </View>
              </View>
              <View style={[styles.card, { backgroundColor: '#E7FD72' }]}>
                <TouchableOpacity style={styles.plus}>
                  <PlusSVG />
                </TouchableOpacity>
                <View style={{ marginLeft: 16, marginBottom: 16 }}>
                  <Text style={styles.cardTitle}>Charts</Text>
                  <Text style={styles.cardDescription}>Something...</Text>
                </View>
              </View>
              <View style={[styles.card, { backgroundColor: '#FFD700' }]}>
                <TouchableOpacity style={styles.plus}>
                  <PlusSVG />
                </TouchableOpacity>
                <View style={{ marginLeft: 16, marginBottom: 16 }}>
                  <Text style={styles.cardTitle}>Savings</Text>
                  <Text style={styles.cardDescription}>Something...</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <View style={{flex: 1, paddingHorizontal: 16,}}>
              <View style={styles.totalsavings}>
                <Text style={{fontWeight: 'bold'}}>Total Savings</Text>
                <TotalSavingSVG style={{width: 50, height: 44}} />
              </View>
          </View>
        </View>
      )}

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Entries' && styles.activeTab]}
          onPress={handleEntriesPress}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Entries' && styles.activeTabText,
            ]}
          >
            Entries
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Charts' && styles.activeTab]}
          onPress={handleChartsPress}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Charts' && styles.activeTabText,
            ]}
          >
            Charts
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.contentContainer,
          !showCards && styles.expandedContentContainer,
        ]}
      >
        {CurrentTabComponent}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: ('5%'),
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  selections: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  selection: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  selectionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  cards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    height: 'auto',
    width: 175,
    borderRadius: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  cardDescription: {
    fontSize: 12,
    color: '#454745',
  },
  tabsContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'black',
    marginTop: 20,
  },
  activeTab: {
    flex: 1,
    backgroundColor: 'white',
  },
  activeTabText: {
    color: 'black',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  tab: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#E6E9EE',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C4C9CF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  icon: {
    width: 30, 
    height: 30, 
    marginRight: 10
  },
  rightContainer: {
    flex: 1,
    paddingLeft: 8,
  },
  entryRow: {
    flexDirection: 'column',
    marginTop: 5,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 16,
    backgroundColor: '#f9f9f9',
  },
  entryName: {
    color: 'black',
    fontWeight: 'bold',
  },
  entryAmount: {
    color: 'green',
    fontWeight: 'bold',
  },
  expandedContentContainer: {
    flex: 1,
  },
  totalsavings: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    marginBottom: 4,
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 20, 
    paddingVertical: 4,
    borderRadius: 8,  
    backgroundColor: '#9AEF5E', 
  },
  plus: {
    backgroundColor: '#FAFAFA', 
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 16,
    marginTop: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
