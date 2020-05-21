import React, {useState} from 'react';
import { 
	View, 
	TextInput, 
	StyleSheet, 
	Text, 
	Button, 
	TouchableWithoutFeedback, 
	Keyboard,
	Alert
} from 'react-native';

import Card from '../components/Card.js';
import Input from '../components/Input.js';
import NumberContainer from '../components/NumberContainer.js';
import Colors from '../constants/Colors.js';
import AppStyles from '../constants/AppStyles';

const StartGameScreen = props => {


	const [ enteredValue, setEnteredValue ] = useState('');
	const [ confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState('');

	const numberInputHandler = inputText => {
		setEnteredValue(inputText.replace(/[^0-9]/g), '');
	};

	const resetInputHandler = () => {
		setEnteredValue('');
		setConfirmed(false);
	};

	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredValue);
		if (isNaN(chosenNumber) 
			|| chosenNumber <= 0 
			|| chosenNumber > 99) {
				Alert.alert(
					'Invalid Number!', 
					'Number has to be number between 1 and 99.', 
					[{text: 'Okay', 
					style: 'destructive', 
					onPress: resetInputHandler }]
					);
			return;
		}
		setConfirmed(true);
		setSelectedNumber(chosenNumber);
		setEnteredValue('');
		Keyboard.dismiss();
	};

	let confirmedOutput;

	if (confirmed) {
		confirmedOutput = 
			<Card style={styles.summaryContainer}>
				<Text>You selected</Text>
				<NumberContainer>{selectedNumber}</NumberContainer>
				<Button
					color={Colors.primary}
					title="START GAME"
					onPress={()=> props.onStartGame(selectedNumber)}/> 
			</Card>
	}
	return (
		<TouchableWithoutFeedback onPress={()=> {
			Keyboard.dismiss();
		}}>
			<View style={styles.screen}>
				<Text style={AppStyles.title}>Pick a number between 1 and 99 and I'll guess it!</Text>
				<Card style={styles.inputContainer}>
					<Text>Select a Number</Text>
					<Input style={styles.input} 
						blurOnSubmit 
						autoCapitalize='none' 
						autoCorrect={false} 
						keyboardType="number-pad" 
						maxLength={2}
						onChangeText={numberInputHandler}
						value={enteredValue}
					/>
					<View style={styles.buttonContainer} >
						<View style={styles.button}>
							<Button 
								color={Colors.accent} 
								title="Reset" 
								onPress={resetInputHandler}/>
						</View>
						<View style={styles.button}>
							<Button 
								color={Colors.primary} 
								title="Confirm" 
								onPress={confirmInputHandler}/>
						</View>
					</View>
				</Card>
				{confirmedOutput}
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
	},
	inputContainer: {
		width: 300,
		maxWidth: '80%',
		alignItems: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		paddingHorizontal: 15
	},
	button: {
		width: 101,
	},
	input: {
		width: 50,
		borderRadius: 10,
		borderWidth: 2,
		textAlign: 'center'
	},
	summaryContainer: {
		marginTop: 20,
	}
});

export default StartGameScreen; 