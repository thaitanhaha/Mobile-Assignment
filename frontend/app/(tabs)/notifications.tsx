import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import HeaderComponent from '@/components/HeaderComponent';

export default function NotificationsScreen() {
return (
<View style={styles.container}>
	<HeaderComponent />

	<View style={styles.notificationsContainer}>
		<Text style={styles.notificationsTitle}>Notifications</Text>
	</View>

	<View style={styles.formContainer}>
		<View style={styles.inputContainer}>
			<Image source={require('../../assets/images/favicon.png')} style={styles.icon} />
			<View style={styles.rightContainer}>
				<Text style={styles.inputLabel}>18/12/2024</Text>
				<View style={styles.inputRow}>
				<View style={styles.inputValue}>
					<Text style={styles.notificationHeader}>Profile Updated</Text>
				</View>
				<TouchableOpacity style={styles.arrowButton}>
					<Text style={styles.arrowText}>→</Text>
				</TouchableOpacity>
				</View>
			</View>
		</View>

		<View style={styles.inputContainer}>
			<Image source={require('../../assets/images/favicon.png')} style={styles.icon} />
			<View style={styles.rightContainer}>
				<Text style={styles.inputLabel}>18/12/2024</Text>
				<View style={styles.inputRow}>
				<View style={styles.inputValue}>
					<Text style={styles.notificationHeader}>Budget Limit Reached</Text>
					<Text>Slow down your expense bro.{"\n"}
					You have passed your expense goal limit.{"\n"}
					AMOUNT PASSED: <Text style={styles.amountPassed}>5.00 USD</Text>
					</Text>
				</View>
				<TouchableOpacity style={styles.arrowButton}>
					<Text style={styles.arrowText}>→</Text>
				</TouchableOpacity>
				</View>
			</View>
		</View>
	</View>

</View>
);
}

const styles = StyleSheet.create({
container: {
	flex: 1,
	backgroundColor: 'black', 
},
notificationsContainer: {
	alignItems: 'center',
	marginTop: 20,
	marginBottom: 40,
},
notificationsImage: {
	width: 100,
	height: 100,
	borderRadius: 50,
	borderWidth: 2,
	borderColor: 'white',
	marginTop: 16,
},
notificationsTitle: {
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
	width: 30, 
	height: 30, 
	marginRight: 10
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
	borderColor: '#ccc',
	borderWidth: 1,
	paddingLeft: 10,
	paddingVertical: 8,
	borderRadius: 16,
	marginRight: 10,
	backgroundColor: '#f9f9f9',
	textAlignVertical: 'center'
},
arrowButton: {
	paddingLeft: 10,
},
arrowText: {
	fontSize: 20,
	color: '#333',
},
notificationHeader: {
	fontSize: 16,
	fontWeight: 'bold',
	color: 'black',
	marginBottom: 5,
},
amountPassed: {
	color: 'red',
	fontWeight: 'bold',
},  
});
