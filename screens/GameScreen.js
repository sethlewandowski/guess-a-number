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

const generateRandomBetween = (min, max, exclude) = {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNum = (Math.random() * (max - min)) + min;
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
};

const styles = StyleSheet.create({});

export default GameScreen;