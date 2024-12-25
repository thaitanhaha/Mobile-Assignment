import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ErrorSVG from '../assets/icons/error.svg';

interface ErrorModalProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}

export default function ErrorModal({ visible, message, onClose }: ErrorModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <ErrorSVG style={{ width: 75, height: 75 }} />
                <Text style={styles.modalTitle}>{message}</Text>
            </View>
        </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FAFAFA',
        padding: 20,
        borderRadius: 36,
        width: wp('80%'),
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center'
    },
});
