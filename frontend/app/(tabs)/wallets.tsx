import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import HeaderComponent from '@/components/HeaderComponent';
import { ProgressBar } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CashSVG from '../../assets/icons/Cash.svg';
import MomoSVG from '../../assets/icons/Momo.svg';
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import axios from 'axios';
import DeleteSVG from "../../assets/icons/delete.svg";
import DeleteModal from "../../components/DeleteModal";
import ErrorModal from "../../components/ErrorModal";
import SuccessModal from "../../components/SuccessModal";
import useModalManager from "../../hooks/useModalManager";

export default function WalletsScreen() {
  const [goals, setGoals] = useState([]);
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

  const getGoals = async () => {
    try {
        const goalsResponse = await axios.get('https://mobile-assignment.onrender.com/mgs');
        console.log(goalsResponse.data);
        setGoals(goalsResponse.data);
    } catch (err) {
        console.log(err);
    }
  };

  const deleteGoal = async (goalId) => {
    try {
      await axios.delete(`https://mobile-assignment.onrender.com/mgs/${goalId}`);
      setGoals(goals.filter((goal) => goal._id !== goalId));
      handleSuccess();
    } catch (err) {
      console.log(err);
      handleError();
    }
  };

  useEffect(() => {
    getGoals();
  }, []);

  return (
   <GestureHandlerRootView style={{ flex: 1 }}>
    <View style={styles.container}>
      <HeaderComponent />

      <View style={styles.walletsContainer}>
        <Text style={styles.walletsTotal}>$1500.0</Text>
        <Text style={styles.totalBalance}>Total Balance</Text>
      </View>

      <ScrollView style={styles.formContainer}>
        <Text style={styles.sectionTitle}>My Wallets</Text>
        <View>
          <View style={styles.inputContainer}>
            <CashSVG style={styles.icon} />
            <View style={styles.rightContainer}>
              <View style={styles.walletRow}>
                <View style={styles.walletInfo}>
                  <Text style={styles.walletName}>Cash</Text>
                  <Text style={styles.walletAmount}>900.00 USD</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <MomoSVG style={styles.icon} />
            <View style={styles.rightContainer}>
              <View style={styles.walletRow}>
                <View style={styles.walletInfo}>
                  <Text style={styles.walletName}>Momo</Text>
                  <Text style={styles.walletAmount}>600.00 USD</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Margin/Goals</Text>
        <ScrollView style={{ paddingVertical: 8 }}>
          {goals.map((goal) => (
            <View key={goal._id} style={styles.inputContainer}>
              <Image source={require('../../assets/images/favicon.png')} style={styles.icon} />
              <View style={styles.rightContainer}>
                <View style={styles.walletRow}>
                  <View style={styles.goalInfo}>
                    <Text style={styles.walletName}>{goal.category}</Text>
                    <ProgressBar progress={0.8} color="#4CAF50" style={styles.progressBar} />
                    <View style={styles.goalDetail}>
                      <Text style={styles.goalPercent}>80%</Text>
                      <Text style={styles.goalPercent}>{goal.totalAmount} USD</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.arrowButton} onPress={() => handleDeletePress(goal._id)} >
                    <DeleteSVG style={{ width: 20, height: 20 }} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

      </ScrollView>
    </View>
    <DeleteModal
      visible={modalVisible}
      notificationToDelete={thingToDelete}
      onConfirmDelete={() => handleConfirmDelete(deleteGoal)}
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
   </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', 
    paddingTop: ('5%'),
  },
  walletsContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  walletsTotal: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
  totalBalance: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
  },
  formContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    marginTop: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  arrowButton: {
    paddingLeft: 10,
  },
  arrowText: {
    fontSize: 20,
    color: '#333',
  },
  walletRow: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 5
  },
  walletInfo: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 16,
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
  goalInfo: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 16,
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
  walletName: {
    color: 'black',
    fontWeight: 'bold',
  },
  walletAmount: {
    color: 'green',
    fontWeight: 'bold',
  },
  goalPercent: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E0E0E0',
    marginBottom: 8,
    marginTop: 8,
  },
  goalDetail: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
});
