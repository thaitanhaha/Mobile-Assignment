import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import ExpenseSVG from '../assets/icons/expense.svg';
import BudgetSVG from '../assets/icons/budget.svg';
import DeleteSVG from '../assets/icons/delete.svg';
import DeleteModal from "../components/DeleteModal";
import ErrorModal from "../components/ErrorModal";
import SuccessModal from "../components/SuccessModal";
import useModalManager from "../hooks/useModalManager";
import axios from 'axios';

function EntriesTab({ entries, showDelete, onDeleteEntry }) {
  const [isBudget, setIsBudget] = useState(false);
  const {
    modalVisible,
    successModalVisible,
    errorModalVisible,
    thingToDelete,
    handleDeletePress,
    handleConfirmDelete,
    handleCancelDelete,
    handleSuccess,
    handleError,
    setModalVisible,
    setSuccessModalVisible,
    setErrorModalVisible,
    setThingToDelete,
  } = useModalManager();

  const deleteEntry = async (entryId) => {
    try {
      if (isBudget) {
        await axios.delete(`https://mobile-assignment.onrender.com/budgets/${entryId}`);
      } else {
        await axios.delete(`https://mobile-assignment.onrender.com/expenses/${entryId}`);
      }
      onDeleteEntry(entryId);
      handleSuccess();
    } catch (err) {
      console.log(err);
      handleError();
    }
  };

  return (
    <ScrollView style={{ paddingVertical: 8 }}>
      <DeleteModal
        visible={modalVisible}
        notificationToDelete={thingToDelete}
        onConfirmDelete={() => handleConfirmDelete(deleteEntry)}
        onCancelDelete={handleCancelDelete}
      />
      <ErrorModal
        visible={errorModalVisible}
        message="Error!"
        onClose={() => setErrorModalVisible(false)}
      />
      <SuccessModal
        visible={successModalVisible}
        message="Success!"
        onClose={() => setSuccessModalVisible(false)}
      />
      {entries.map((entry) => (
        <View key={entry._id} style={styles.inputContainer}>
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
          {showDelete == true && 
          <TouchableOpacity style={styles.arrowButton} 
            onPress={() => {
              setIsBudget(entry.totalAmount > 0);
              handleDeletePress(entry._id);
            }} 
          >
            <DeleteSVG style={{ marginLeft: 8, marginRight: 8, width: 20, height: 20 }} />
          </TouchableOpacity>
          }
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
