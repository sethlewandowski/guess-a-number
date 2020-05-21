import React, { useState, useRef, useEffect } from 'react';

import { 
	View, 
	TextInput, 
	StyleSheet, 
	Text, 
	Button, 
	TouchableWithoutFeedback, 
	Keyboard,
	Alert,
	ScrollView,
	FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

const renderListItem = (listLength, itemData) => (
					<View style={styles.listItem}>
						<Text>#{listLength - itemData.index} guess: {itemData.item}</Text>
					</View>);

const GameScreen = props => {
	const initialGuess = generateRandomBetween(1, 100, props.userChoice);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	const { userChoice, onGameOver } = props;

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(pastGuesses.length);
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
			currentLow.current = currentGuess + 1;
		}
		const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
		setCurrentGuess(nextNumber);
		setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
	}

	return (
		<View style={styles.screen}>
			<ScreenHeader>Is it ?</ScreenHeader>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
					<Ionicons name='md-remove' size={24} color="white"/>
				</MainButton>
				<MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
					<Ionicons name='md-add' size={24} color='white' />
				</MainButton>
			</Card>
			<Card style={styles.buttonContainer}>
				<MainButton style={styles.startOverButton} onPress={props.onRestart}>
					Start Over
				</MainButton>
			</Card>
			<View style={styles.listContainer}>
				{/*<ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
				</ScrollView>*/}
				<FlatList 
				keyExtractor={(item) => item} 
				data={pastGuesses} 
				renderItem={renderListItem.bind(this, pastGuesses.length)}
				contentContainerStyle={styles.list} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
		width: '100%'
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
	},
	listItem: {
		borderColor: 'black',
		borderWidth: 1,
		padding: 15, 
		marginVertical: 10,
		backgroundColor: 'white',
		width: '100%',
		justifyContent: 'space-between',
	},
	listContainer: {
		flex: 1,
		width: 300,
	},
	list: {
		alignItems: 'center',
		justifyContent: 'flex-end',
		flexGrow: 1,
	}
});

export default GameScreen;