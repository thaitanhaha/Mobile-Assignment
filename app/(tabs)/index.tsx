import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import HeaderComponent from '@/components/HeaderComponent';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <HeaderComponent />

      {/* Screen Content */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Happy saving!</Text>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Interest</Text>
          </TouchableOpacity>
        </View>

        {/* Cards Section (Horizontal Scroll) */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.cards}>
            <View style={[styles.card, { backgroundColor: '#B8FBC0' }]}>
              <Text style={styles.cardTitle}>Total</Text>
              <Text style={styles.cardDescription}>Something...</Text>
            </View>
            <View style={[styles.card, { backgroundColor: '#FAF8B0' }]}>
              <Text style={styles.cardTitle}>Expense</Text>
              <Text style={styles.cardDescription}>Something...</Text>
            </View>
            <View style={[styles.card, { backgroundColor: '#FFD700' }]}>
              <Text style={styles.cardTitle}>Savings</Text>
              <Text style={styles.cardDescription}>Something...</Text>
            </View>
            {/* Add more cards as needed */}
          </View>
        </ScrollView>
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
  tabs: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  tab: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tabText: {
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
    height: 100,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    width: 200, // Set the width of each card
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  cardDescription: {
    fontSize: 12,
    color: 'black',
  },
});
