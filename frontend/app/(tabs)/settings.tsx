import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, Modal, Button } from 'react-native';
import HeaderComponent from '@/components/HeaderComponent';
import DoneSVG from '../../assets/icons/done.svg';
import EditSVG from '../../assets/icons/edit.svg';
import FullnameSVG from '../../assets/icons/full-name.svg';
import CountrySVG from '../../assets/icons/country.svg';
import JobSVG from '../../assets/icons/job.svg';
import EditModal from '../../components/EditModal';
import DropDownPicker from 'react-native-dropdown-picker';

interface Values {
  fullName: string;
  country: string;
  job: string;
}

const fieldIconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  fullName: FullnameSVG,
  country: CountrySVG,
  job: JobSVG,
};

export default function SettingsScreen() {
  const [editField, setEditField] = useState<keyof Values | null>(null);
  const [values, setValues] = useState<Values>({
    fullName: 'Corin Reveck',
    country: 'Vietnam',
    job: 'Alchemist',
  });
  const [tempValue, setTempValue] = useState<string | null>(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);
  const [openJob, setOpenJob] = useState(false);

  const handleEditPress = (field: keyof Values) => {
    if (editField === field) {
      setTempValue(null);
      setEditField(null);
    } else {
      setTempValue(values[field]);
      setEditField(field);
    }
  };

  const handleInputChange = (field: keyof Values, value: string) => {
    setTempValue(value);
  };

  const handleConfirmEdit = () => {
    if (editField) {
      setValues((prevValues) => ({ ...prevValues, [editField]: tempValue || prevValues[editField] }));
    }
    setEditField(null);
    setTempValue(null);
    setConfirmModalVisible(false);
  };

  const handleCancelEdit = () => {
    setTempValue(null);
    setEditField(null);
    setConfirmModalVisible(false);
  };

  const renderInputOrText = (field: keyof Values, label: string) => {
    const isEditing = editField === field;
    const IconComponent = fieldIconMap[field];

    const countryItems = [
      { label: 'China', value: 'China' },
      { label: 'USA', value: 'USA' },
      { label: 'Vietnam', value: 'Vietnam' },
    ];
    
    const jobItems = [
      { label: 'Alchemist', value: 'Alchemist' },
      { label: 'Developer', value: 'Developer' },
      { label: 'Designer', value: 'Designer' },
      { label: 'Student', value: 'Student' },
    ];

    return (
      <View style={styles.inputContainer}>
        <IconComponent style={styles.icon} />
        <View style={styles.rightContainer}>
          <Text style={styles.inputLabel}>{label}</Text>
          <View style={styles.inputRow}>
            {isEditing ? (
              field === 'country' ? (
                <DropDownPicker
                  open={openCountry}
                  value={tempValue || values.country}
                  items={countryItems}
                  setOpen={setOpenCountry}
                  setValue={setTempValue}
                  style={styles.dropContainer}
                  dropDownContainerStyle={styles.dropdownList}
                  dropDownDirection="TOP"
                  listMode="SCROLLVIEW"
                />
              ) : field === 'job' ? (
                <DropDownPicker
                  open={openJob}
                  value={tempValue || values.job}
                  items={jobItems}
                  setOpen={setOpenJob}
                  setValue={setTempValue}
                  style={styles.dropContainer}
                  dropDownContainerStyle={styles.dropdownList}
                  dropDownDirection="TOP"
                  listMode="SCROLLVIEW"
                />
              ) : (
                <TextInput
                  style={styles.dropContainer}
                  value={tempValue || ''}
                  onChangeText={(text) => handleInputChange(field, text)}
                  autoFocus
                />
              )
            ) : (
              <Text style={styles.inputValue}>{values[field]}</Text>
            )}
            <TouchableOpacity
              onPress={() => {
                if (isEditing) {
                  setConfirmModalVisible(true);
                } else {
                  handleEditPress(field);
                }
              }}
            >
              {isEditing ? (
                <DoneSVG style={styles.icon_edit} />
              ) : (
                <EditSVG style={styles.icon_edit} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const handleTouchablePressOutside = () => {
    Keyboard.dismiss();
    if (editField !== null) {
      setEditField(null);
      setTempValue(null);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleTouchablePressOutside}>
      <View style={styles.container}>
        <HeaderComponent />

        <View style={styles.profileContainer}>
          <Text style={styles.profileTitle}>Profile</Text>
          <Image
            source={{ uri: 'https://www.shareicon.net/data/128x128/2016/09/15/829459_man_512x512.png' }}
            style={styles.profileImage}
          />
        </View>

        <ScrollView style={styles.formContainer}>
          {renderInputOrText('fullName', 'Full name')}
          {renderInputOrText('country', 'Country')}
          {renderInputOrText('job', 'Job')}
        </ScrollView>

        <EditModal
          visible={confirmModalVisible}
          thingToEdit={editField}
          onConfirmEdit={handleConfirmEdit}
          onCancelEdit={handleCancelEdit}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', 
    paddingTop: ('5%'),
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 16,
  },
  profileTitle: {
    fontSize: 24,
    color: 'white',
    marginTop: 10,
    fontWeight: 'bold',
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
  inputRow: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 5
  },
  icon: {
    width: 40, 
    height: 40, 
    marginRight: 10
  },
  icon_edit: {
    width: 20, 
    height: 20,
  },
  rightContainer: {
    flex: 1,
    paddingLeft: 8,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  inputValue: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
  dropContainer: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
  dropdownList: {
    maxHeight: 200,
    overflow: 'hidden',
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
    zIndex: 10,
  },
});
