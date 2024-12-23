import React, { useState } from 'react';
import { View, Text, Modal, TouchableHighlight, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SuccessModal from './SuccessModal';

type DeleteModalProps = {
  visible: boolean;
  notificationToDelete: any;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
};

const DeleteModal = ({
  visible,
  notificationToDelete,
  onConfirmDelete,
  onCancelDelete,
}: DeleteModalProps) => {
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const handleConfirmDelete = () => {
    setSuccessModalVisible(true);
    onConfirmDelete();
    setTimeout(() => {
      setSuccessModalVisible(false);
    }, 1000);
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onCancelDelete}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Deletion</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to delete{' '}
              <Text style={{ fontWeight: 'bold' }}>{notificationToDelete?.header}</Text>?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableHighlight style={styles.modalButton} onPress={onCancelDelete}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.modalButtonYes} onPress={handleConfirmDelete}>
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <SuccessModal
        visible={successModalVisible}
        message="Notification deleted successfully!"
        onClose={() => setSuccessModalVisible(false)}
      />
    </>
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
  },
  modalMessage: {
    fontSize: 16,
    marginVertical: 15,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#E6E9EE',
    padding: 10,
    borderRadius: 100,
    margin: 5,
    width: '45%',
    alignItems: 'center',
  },
  modalButtonYes: {
    backgroundColor: '#9AEF5E',
    padding: 10,
    borderRadius: 100,
    margin: 5,
    width: '45%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default DeleteModal;
