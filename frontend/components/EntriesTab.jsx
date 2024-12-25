import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import ExpenseSVG from '../assets/icons/expense.svg';
import BudgetSVG from '../assets/icons/budget.svg';

function EntriesTab({ entries }) {
  return (
    <ScrollView style={{ paddingVertical: 8 }}>
      {entries.map((entry) => (
        <View key={entry.id} style={styles.inputContainer}>
          {entry.totalAmount > 0 ? (
            <BudgetSVG style={styles.icon} />
          ) : (
            <ExpenseSVG style={styles.icon} />
          )}
          <View style={styles.rightContainer}>
            <View style={styles.entryRow}>
              <View style={styles.entryInfo}>
                <Text style={styles.entryName}>{entry.items[0].name}</Text>
                {entry.totalAmount > 0 ? (
                  <Text style={styles.entryAmount}>+ {entry.totalAmount} USD</Text>
                ) : (
                  <Text style={styles.entryAmountMinus}>{entry.totalAmount} USD</Text>
                )}
              </View>
              <Text>{entry.category} - {entry.date}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
    },
    icon: {
      width: 30,
      height: 30,
      marginRight: 10,
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
    entryInfo: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      fontWeight: 'bold',
      marginBottom: 4,
      alignItems: 'center',
    },
    entryName: {
      color: 'black',
      fontWeight: 'bold',
    },
    entryAmount: {
      color: 'green',
      fontWeight: 'bold',
    },
    entryAmountMinus: {
      color: 'red',
      fontWeight: 'bold',
    },
  });
export default EntriesTab;
