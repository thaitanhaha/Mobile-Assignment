import React from 'react';
import { View, Text, Modal, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

type SuccessModalProps = {
  visible: boolean;
  message: string;
  onClose: () => void;
};

const SuccessModal = ({ visible, message, onClose }: SuccessModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
            <Image
                source={require('../assets/icons/check.gif')}
                style={{ width: 75, height: 75 }}
            />
          <Text style={styles.modalTitle}>Success</Text>
        </View>
      </View>
    </Modal>
  );
};

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
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default SuccessModal;
