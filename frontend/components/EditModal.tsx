import React, { useState } from 'react';
import { View, Text, Modal, TouchableHighlight, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

type EditModalProps = {
  visible: boolean;
  thingToEdit: any;
  onConfirmEdit: () => void;
  onCancelEdit: () => void;
};

const EditModal = ({
  visible,
  thingToEdit,
  onConfirmEdit,
  onCancelEdit,
}: EditModalProps) => {

  const handleConfirmDelete = () => {
    onConfirmEdit();
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onCancelEdit}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to edit{' '}
              <Text style={{ fontWeight: 'bold' }}>{thingToEdit?.header}</Text>?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableHighlight style={styles.modalButton} onPress={onCancelEdit}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.modalButtonYes} onPress={handleConfirmDelete}>
                <Text style={styles.modalButtonText}>Edit</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
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

export default EditModal;
