import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import HeaderComponent from '@/components/HeaderComponent';

function EntriesTab() {
  return (
    <View>
      ABC
    </View>
  );
}

function ChartsTab() {
  return (
    <View>
      DEF
    </View>
  );
}

export default function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState('Entries');

  let CurrentTabComponent;
  if (selectedTab === 'Entries') CurrentTabComponent = EntriesTab;
  if (selectedTab === 'Charts') CurrentTabComponent = ChartsTab;

  return (
    <View style={styles.container}>
      <HeaderComponent />

      {/* Screen Content */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Happy saving!</Text>

        {/* Tabs */}
        <View style={styles.selections}>
          <TouchableOpacity style={styles.selection}>
            <Text style={styles.selectionText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.selection}>
            <Text style={styles.selectionText}>Favourite</Text>
          </TouchableOpacity>
        </View>

        {/* Cards Section (Horizontal Scroll) */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.cards}>
            <View style={[styles.card, { backgroundColor: '#BAEC97' }]}>
              <TouchableOpacity style={{backgroundColor: 'white', height: 50, width: 50}}>
                <Text>Button</Text>
              </TouchableOpacity>
              <View style={{ marginLeft: 8, marginBottom: 16 }}>
                <Text style={styles.cardTitle}>Total</Text>
                <Text style={styles.cardDescription}>Something...</Text>
              </View>
            </View>
            <View style={[styles.card, { backgroundColor: '#E7FD72' }]}>
              <View style={{ marginLeft: 8, marginBottom: 16 }}>
                <Text style={styles.cardTitle}>Charts</Text>
                <Text style={styles.cardDescription}>Something...</Text>
              </View>
            </View>
            <View style={[styles.card, { backgroundColor: '#FFD700' }]}>
              <View style={{ marginLeft: 8, marginBottom: 16 }}>
                <Text style={styles.cardTitle}>Savings</Text>
                <Text style={styles.cardDescription}>Something...</Text>
              </View>
            </View>
            {/* Add more cards as needed */}
          </View>
        </ScrollView>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Entries' && styles.activeTab]}
          onPress={() => setSelectedTab('Entries')}
        >
          <Text style={[styles.tabText, selectedTab === 'Entries' && styles.activeTabText]}>Entries</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Charts' && styles.activeTab]}
          onPress={() => setSelectedTab('Charts')}
        >
          <Text style={[styles.tabText, selectedTab === 'Charts' && styles.activeTabText]}>Charts</Text>
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
    marginBottom: 16,
  },
  card: {
    flex: 1,
    height: 175,
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
    backgroundColor: 'white',
  },
  activeTabText: {
    color: 'black',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
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
});
