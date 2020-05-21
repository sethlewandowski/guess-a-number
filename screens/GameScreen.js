import React, { useState, useRef, useEffect } from 'react';

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

import NumberContainer from '../components/NumberContainer.js';
import Card from '../components/Card.js';
import ScreenHeader from '../components/ScreenHeader.js';
import MainButton from '../components/MainButton.js';

const generateRandomBetween = (min, max, exclude) => {
	 min = Math.ceil(min);
	 max = Math.floor(max);
	const rndNum = Math.floor(Math.random() * (max - min)) + min;
	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
};

const GameScreen = props => {
	const [currentGuess, setCurrentGuess] = useState(
		generateRandomBetween(1, 100, props.userChoice)
		);	

	const [rounds, setRounds] = useState(0);
	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	const { userChoice, onGameOver } = props;

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(rounds);
		}
	}, [currentGuess, userChoice, onGameOver ]);

	const nextGuessHandler = direction => {
		if ((direction === 'lower' && currentGuess < props.userChoice) 
			|| (direction === 'greater' && currentGuess > props.userChoice)) {
				Alert.alert('Don\'t lie!', 'You know that this is wrong!', 
					[{text: 'Sorry!', style: 'cancel' }]
				);
				return;
			}
		if (direction === 'lower') {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess;
		}
		const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
		setCurrentGuess(nextNumber);
		setRounds(curRounds => curRounds + 1);
	}

	return (
		<View style={styles.screen}>
			<ScreenHeader>Is it ?</ScreenHeader>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<Button 
					title="LOWER" 
					onPress={nextGuessHandler.bind(this, 'lower')}
				/>
				<Button 
					title="GREATER" 
					onPress={nextGuessHandler.bind(this, 'greater')}
				/>
			</Card>
			<Card style={styles.buttonContainer}>
				<MainButton style={styles.startOverButton} onPress={props.onRestart}>
					Start Over
				</MainButton>
			</Card>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',

	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
		width: 300,
		maxWidth: '80%',
	},
	startOverButton: {
		backgroundColor: 'red',
	}
});

export default GameScreen;