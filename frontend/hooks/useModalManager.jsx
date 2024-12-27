import { useState } from "react";

const useModalManager = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [thingToDelete, setThingToDelete] = useState(null);

  const handleDeletePress = (thingId) => {
    console.log(thingId);
    setThingToDelete(thingId);
    setModalVisible(true);
  };

  const handleConfirmDelete = (deleteAction) => {
    if (thingToDelete !== null) {
      deleteAction(thingToDelete);
    }
    setModalVisible(false);
    setThingToDelete(null);
  };

  const handleCancelDelete = () => {
    setModalVisible(false);
    setThingToDelete(null);
  };

  const handleSuccess = () => {
    setSuccessModalVisible(true);
    setTimeout(() => {
      setSuccessModalVisible(false);
    }, 1000);
  };

  const handleError = () => {
    setErrorModalVisible(true);
    setTimeout(() => {
      setErrorModalVisible(false);
    }, 1000);
  };

  return {
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
  };
};

export default useModalManager;
